import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerifications } from 'email-verification/entities/email-verification.entity';
import { Repository } from 'typeorm';
import { User } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { MailService } from 'utils/mail.service';
import { HashService } from 'user/hash.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailVerifications)
    private readonly emailVerificationRepo: Repository<EmailVerifications>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly hashService: HashService,
  ) {}

  public async login(username: string, pass: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('User not found');

    const validPassword = await this.hashService.comparePassword(pass, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('The password does not match!');
    }

    const verifiedUser = await this.userRepo.findOne({ where: { username } });

    if (verifiedUser?.verified_at === null) {
      throw new UnauthorizedException('This user has not been verified!');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
      }),
    };
  }

  public async sendEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');

    const verifiedUser = await this.userRepo.findOne({ where: { email } });

    if (verifiedUser?.verified_at) {
      throw new UnauthorizedException('This user has already been verified!');
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
      url: url,
      expiresAt: expires_at.toUTCString(),
    });

    await this.emailVerificationRepo.save({ user, token, expires_at });
  }

  public async verifyEmail(email: string) {
    await this.userService.confirmEmail(email);
  }

  public async decodeVerificationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException('Invalid token payload structure');
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Your email confirmation token has expired');
      }
    }
    throw new BadRequestException('Failed to verify email token');
  }

  public async resendVerificationLink(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');

    if (user.verified_at) {
      throw new BadRequestException('Email already verified');
    }
    await this.sendEmail(user.email);
  }
}
