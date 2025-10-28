import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestEmailDto } from './dto/request-email.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-email')
  async sendEmail(@Body() dto: RequestEmailDto) {
    await this.authService.sendEmail(dto.email);
    return { message: 'Verification link sent to your email' };
  }

  @Post('resend-email')
  async resendVerificationLink(@Body() dto: ResendEmailDto) {
    await this.authService.resendVerificationLink(dto.email);
    return {message: 'Verification link has been sent to your email again'};
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const email = await this.authService.decodeVerificationToken(dto.token);
    await this.authService.verifyEmail(email);
    return { message: 'The email is verified', data: {email} };
  }
}
