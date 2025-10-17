import { RequestEmailDto } from './dto/request-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { EmailVerificationService } from './email-verification.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('send-email')
  async sendEmail(@Body() dto: RequestEmailDto) {
    await this.emailVerificationService.sendEmail(dto.email);
    return { message: 'Verification link sent to your email' };
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const email = await this.emailVerificationService.decodeVerificationToken(dto.token);
    await this.emailVerificationService.verifyEmail(email);
    return { message: 'The email is verified' };
  }
}
