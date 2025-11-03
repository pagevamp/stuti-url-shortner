import { Module } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { User } from 'user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'utils/mail.service';
import { UserService } from 'user/user.service';
import { HashService } from 'user/hash.service';
import { LogService } from 'log/log.service';
import { Log } from 'log/entities/log.entity';
import { UrlAnalytics } from 'url-analytics/entities/url-analytics.entity';
import { UrlAnalyticsService } from 'url-analytics/url-analytics.service';
import { BullModule } from '@nestjs/bullmq';
import { UrlAnalyticsProcessor } from 'url-analytics/url-analytics.processor';
import { UrlAnalyticsModule } from 'url-analytics/url-analytics.module';
import { UserModule } from 'user/user.module';
import { MailModule } from 'utils/mail.module';
import { LogModule } from 'log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Url, User, Log, UrlAnalytics]),
    BullModule.registerQueue({ name: 'url_analytics' }),
    UrlAnalyticsModule,
    UserModule,
    MailModule,
    LogModule,
    ConfigModule
  ],
  providers: [
    ConfigService,
    JwtService,
    MailService,
    UserService,
    HashService,
    LogService,
    UrlService,
    UrlAnalyticsService,
  ],
  controllers: [UrlController],
})
export class UrlModule {}
