import { RequestEmailDto } from './dto/request-email.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { EmailVerificationService } from './email-verification.service';
import { Body, Controller, Post, Req } from '@nestjs/common';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('send-email')
  async sendEmail(@Body() dto: RequestEmailDto) {
    await this.emailVerificationService.sendEmail(dto.email);
    return { message: 'Verification link sent to your email' };
  }

  @Post('resend-email')
  async resendVerificationLink(@Body() dto: ResendEmailDto) {
    await this.emailVerificationService.resendVerificationLink(dto.id);

    return 'Verification link has been sent to your email again';
  }
}
