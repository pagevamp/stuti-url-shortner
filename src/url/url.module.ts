import { Module } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { User } from 'user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Log } from 'log/entities/log.entity';
import { UrlAnalytics } from 'url-analytics/entities/url-analytics.entity';
import { BullModule } from '@nestjs/bullmq';
import { UrlAnalyticsModule } from 'url-analytics/url-analytics.module';
import { UserModule } from 'user/user.module';
import { MailModule } from 'utils/mail.module';
import { LogModule } from 'log/log.module';
import { CoreModule } from 'core/Core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Url, User, Log, UrlAnalytics]),
    BullModule.registerQueue({ name: 'url_analytics' }),
    UrlAnalyticsModule,
    UserModule,
    MailModule,
    LogModule,
    ConfigModule,
    JwtModule,
    CoreModule,
  ],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
