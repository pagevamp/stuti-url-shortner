import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { HashService } from './hash.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'utils/mail.service';
import { EmailVerifications } from 'email-verification/entities/email-verification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(EmailVerifications)
    private readonly emailVerificationRepo: Repository<EmailVerifications>,
    private readonly hashService: HashService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  public async sendEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verified_at) {
      throw new ConflictException('User already verified!');
    }

    const expires_at = new Date(
      Date.now() + Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    );

    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
      },
    );

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    await this.mailService.sendMail(email, {
      template: 'email',
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: `Verify Your Email Address`,
      project: '.SUS',
      url,
      expiresAt: expires_at.toUTCString(),
    });

    await this.emailVerificationRepo.save({ user, token, expires_at });
  }

  async confirmEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (user.verified_at) {
      throw new ConflictException('Email already verified');
    }

    const updatedUser = {
      ...user,
      verified_at: new Date(),
    };

    await this.userRepo.save(updatedUser);

    return {
      message: 'Email verified successfully',
      email: updatedUser.email,
    };
  }

  async create(createUserDto: RegisterUserDto) {
    const { name, email, username, password } = createUserDto;

    const userByEmail = await this.userRepo.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new ConflictException('Email already in use');
    }

    const userByUsername = await this.userRepo.findOne({
      where: { username },
    });
    if (userByUsername) {
      throw new ConflictException('Username already in use');
    }

    const hashedPassword = await this.hashService.hashPassword(password);
    const user = this.userRepo.create({ name, username, email, password: hashedPassword });

    const savedUser = await this.userRepo.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;
    await this.sendEmail(email);
    return userWithoutPassword;
  }

  async getAllUsers() {
    const user = await this.userRepo.find();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepo.remove(user);
  }
}
