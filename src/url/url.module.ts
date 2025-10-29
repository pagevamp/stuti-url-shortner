import { Module } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'auth/auth.guard';
import { User } from 'user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Url, User])],
  providers: [UrlService, ConfigService,JwtService],
  controllers: [UrlController],
})
export class UrlModule {}
