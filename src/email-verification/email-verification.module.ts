import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification, User])],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService, JwtService, UserService],
})
export class EmailVerificationModule {}
