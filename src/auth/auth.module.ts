import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from 'email-verification/entities/email-verification.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'utils/mail.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'user/user.service';
import { HashService } from 'user/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification, User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, MailService, ConfigService, UserService, HashService],
})
export class AuthModule {}
