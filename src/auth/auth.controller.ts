import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-email')
  async sendEmail(@Body() dto: RequestEmailDto) {
    await this.authService.sendEmail(dto.email);
    return { message: 'Verification link sent to your email' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-email')
  async resendVerificationLink(@Body() dto: ResendEmailDto) {
    await this.authService.resendVerificationLink(dto.email);
    return { message: 'Verification link has been sent to your email again' };
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify-email')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const email = await this.authService.decodeVerificationToken(dto.token);
    await this.authService.verifyEmail(email);
    return { message: 'The email is verified', data: { email } };
  }
}
