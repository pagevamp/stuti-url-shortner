import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerifications } from 'email-verification/entities/email-verification.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'user/user.service';
import { HashService } from 'user/hash.service';
import { MailModule } from 'utils/mail.module';
import { UserModule } from 'user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerifications, User]),
    UserModule,
    MailModule,
    ConfigModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
