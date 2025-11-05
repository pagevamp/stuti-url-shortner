import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlAnalyticsService } from './url-analytics.service';
import { UrlAnalytics } from './entities/url-analytics.entity';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { UrlAnalyticsProcessor } from './url-analytics.processor';
import { UrlAnalyticsController } from './url-analytics.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlAnalytics]),
    BullModule.registerQueue({ name: 'url_analytics' }),
    ConfigModule,
  ],
  controllers:[UrlAnalyticsController],
  exports: [UrlAnalyticsService],
  providers: [UrlAnalyticsService, UrlAnalyticsProcessor],
})
export class UrlAnalyticsModule {}
