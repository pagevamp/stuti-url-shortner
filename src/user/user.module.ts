import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashService } from './hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'core/core.module';
import { EmailVerifications } from 'email-verification/entities/email-verification.entity';
import { MailModule } from 'utils/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailVerifications]),
    JwtModule,
    ConfigModule,
    CoreModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService, HashService],
})
export class UserModule {}
