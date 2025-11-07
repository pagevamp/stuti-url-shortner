import { HashService } from './hash.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async confirmEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (user.verified_at) {
      throw new ConflictException('Email already verified');
    }

    const userWithEmail = await this.userRepo.save(user);
    const { verified_at = new Date(), ...emailVerifiedUser } = userWithEmail;
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
    return userWithoutPassword;
  }

  async getAllUsers() {
    const user = await this.userRepo.find();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, loggedInUserId: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (user?.id !== loggedInUserId) {
      throw new ForbiddenException(`Can only update logged in users`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: string, loggedInUserId: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (user?.id !== loggedInUserId) {
      throw new ForbiddenException(`Can only update logged in users`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepo.remove(user);
  }
}
