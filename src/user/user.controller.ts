import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Body() createUserDto: RegisterUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully. Please verify your email.', data: { user } };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  @Throttle({ default: { ttl: 1000, limit: 15 } })
  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { message: 'Here are all the users.', data: { users } };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return { message: 'The user has been updated successfully', data: { user } };
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (this.usersService.remove(id), { message: 'The user has been deleted successfully' });
  }
}
