import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlAnalyticsService } from './url-analytics.service';
import { UrlService } from 'url/url.service';
import { Url } from 'url/entities/url.entity';
import { User } from 'user/entities/user.entity';
import { Log } from 'log/entities/log.entity';
import { UrlAnalytics } from './entities/url-analytics.entity';
import { MailService } from 'utils/mail.service';
import { LogService } from 'log/log.service';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { UrlAnalyticsProcessor } from './url-analytics.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlAnalytics, Url, User, Log]),
    BullModule.registerQueue({ name: 'url_analytics' }),
  ],
  exports: [UrlAnalyticsService],
  providers: [
    UrlAnalyticsService,
    UrlService,
    ConfigService,
    MailService,
    LogService,
    UrlAnalyticsProcessor,
  ],
})
export class UrlAnalyticsModule {}
