import { RequestEmailDto } from './dto/request-email.dto';
import { EmailVerificationService } from './email-verification.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('send')
  async SendEmail(@Body() dto: RequestEmailDto) {
    await this.emailVerificationService.SendEmail(dto.email);
    return { message: 'Verification link sent to your email' };
  }
}
