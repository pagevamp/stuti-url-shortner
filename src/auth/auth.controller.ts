import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestEmailDto } from './dto/request-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(dto.username, dto.password);

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 48 * 60 * 60 * 1000, // 2 days
    });
    return { message: 'Logged in successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-email')
  async resendVerificationLink(@Body() dto: RequestEmailDto) {
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
