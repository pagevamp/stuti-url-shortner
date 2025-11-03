import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerifications } from './entities/email-verification.entity';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EmailVerifications, User])],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
