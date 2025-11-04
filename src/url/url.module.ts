import { Module } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'utils/mail.module';
import { AuthModule } from 'auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), MailModule, ConfigModule, AuthModule, JwtModule],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
