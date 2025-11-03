import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlAnalyticsService } from './url-analytics.service';
import { UrlAnalytics } from './entities/url-analytics.entity';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { UrlAnalyticsProcessor } from './url-analytics.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlAnalytics]),
    BullModule.registerQueue({ name: 'url_analytics' }),
  ],
  exports: [UrlAnalyticsService],
  providers: [ConfigService, UrlAnalyticsService, UrlAnalyticsProcessor],
})
export class UrlAnalyticsModule {}
