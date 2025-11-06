import { HashService } from './hash.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async confirmEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    if (user.verified_at) {
      throw new BadRequestException('Email already verified');
    }

    user.verified_at = new Date();
    await this.userRepo.save(user);
  }

  async create(createUserDto: RegisterUserDto) {
    const { name, email, username, password } = createUserDto;

    const userByEmail = await this.userRepo.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new BadRequestException('Email already in use');
    }

    const userByUsername = await this.userRepo.findOne({
      where: { username },
    });
    if (userByUsername) {
      throw new BadRequestException('Username already in use');
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

  async update(id: string, updateUserDto: UpdateUserDto, req: Request) {
    const user_id = req.sub?.id;
    const user = await this.userRepo.findOneBy({ id });
    if (id !== user_id) {
      throw new ConflictException('Can only update logged user');
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: string, req: Request) {
    const user_id = req.sub?.id;
    const user = await this.userRepo.findOneBy({ id });
    if (id !== user_id) {
      throw new ConflictException('Can only update logged user');
    }
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepo.remove(user);
  }
}
