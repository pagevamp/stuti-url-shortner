import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email_verification.service';
import { EmailVerificationController } from './email_verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email_verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification])],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
