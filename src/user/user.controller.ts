import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: RegisterUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully. Please verify your email.', user };
  }

  @Get('get')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}


