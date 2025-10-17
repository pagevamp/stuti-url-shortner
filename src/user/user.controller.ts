import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/')
  async create(@Body() createUserDto: RegisterUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully. Please verify your email.', data: { user } };
  }

  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { message: 'Here are all the users.', data: { users } };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return { message: 'The user has been updated successfully', data: { user } };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (this.usersService.remove(id), { message: 'The user has been deleted successfully' });
  }
}
