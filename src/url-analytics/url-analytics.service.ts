import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlAnalytics } from './entities/url-analytics.entity';
import { Repository } from 'typeorm';
import { AnalyticsFilterDto } from './dto/analytics-filter.dto';

@Injectable()
export class UrlAnalyticsService {
  private readonly logger = new Logger(UrlAnalytics.name);
  constructor(
    @InjectQueue('url_analytics')
    private readonly analyticsQueue: Queue,
    @InjectRepository(UrlAnalytics)
    private readonly analyticsRepo: Repository<UrlAnalytics>,
  ) {}

  async analytics(req: Request, urlId: string) {
    const userIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip;
    const userAgent = req.headers['user-agent'];

    await this.analyticsQueue.add(
      'log_visit',
      {
        url_id: urlId,
        ip_address: userIp,
        user_agent: userAgent,
      },
      {
        attempts: 3,
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    );
  }

  async getAllAnalytics() {
    const urlAnalytics = await this.analyticsRepo.find();
    return urlAnalytics;
  }

  async filter(dto: AnalyticsFilterDto) {
    const records = this.analyticsRepo.createQueryBuilder('analytics');

    if (dto.start_date || dto.end_date) {
      records.where('analytics.clicked_at BETWEEN :start AND :end', {
        start: dto.start_date ?? new Date(0), // taking the epoch date if start_date not given
        end: dto.end_date ?? new Date(), // taking current date if end_date not given
      });
    } 

    if (dto.browser) {
      records.andWhere('analytics.browser = :browser', { browser: dto.browser });
    }

    if (dto.device) {
      records.andWhere('analytics.device = :device', { device: dto.device });
    }

    if (dto.os) {
      records.andWhere('analytics.os = :os', { os: dto.os });
    }

    if (dto.country) {
      records.andWhere('analytics.country = :country', { country: dto.country });
    }

    const groupColumns: string[] = [];
    if (dto.groupByUrl) groupColumns.push('analytics.url_id');
    if (dto.groupByBrowser) groupColumns.push('analytics.browser');
    if (dto.groupByDevice) groupColumns.push('analytics.device');
    if (dto.groupByOs) groupColumns.push('analytics.os');
    if (dto.groupByCountry) groupColumns.push('analytics.country');

    if (groupColumns.length > 0) {
      records
        .select(groupColumns.map((col) => `${col} AS "${col.split('.')[1]}"`))
        .addSelect('COUNT(*)', 'count')
        .groupBy(groupColumns.join(', '));

      const data = await records.getRawMany();
      return { count: data.length, data };
    }

    const [data, count] = await records.getManyAndCount();
    return { count, data };
  }
}
