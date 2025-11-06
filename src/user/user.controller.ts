import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'core/auth.guard';
import { Request } from 'express';

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
  @Throttle({ default: { ttl: 1000, limit: 15 } })
  @Get('/')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { message: 'Here are all the users.', data: { users } };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const user = await this.usersService.update(id, updateUserDto, req);
    console.log(req);
    return { message: 'The user has been updated successfully', data: { user } };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return (
      this.usersService.remove(id, req),
      { message: 'The user has been deleted successfully' }
    );
  }
}
