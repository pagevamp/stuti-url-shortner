import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: RegisterUserDto) {
    const { name, email, username, password } = createUserDto;

    const userByEmail = await this.usersRepository.findOne({
      where: { email },
    });
    if (userByEmail) {
      throw new BadRequestException('Email already in use');
    }

    const userByUsername = await this.usersRepository.findOne({
      where: { username },
    });
    if (userByUsername) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    const user = this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async getAllUsers() {
    const user = await this.usersRepository.find();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
