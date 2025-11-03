import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlAnalytics } from './entities/url-analytics.entity';
import {Repository } from 'typeorm';
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

    await this.analyticsQueue.add('log_visit', {
      url_id: urlId,
      ip_address: userIp,
      user_agent: userAgent,
    });
  }

  async getAllAnalytics() {
    const urlAnalytics = await this.analyticsRepo.find();
    return urlAnalytics;
  }

  async filter(dto: AnalyticsFilterDto) {
    const records = this.analyticsRepo.createQueryBuilder('analytics');

    if (dto.start_date && dto.end_date) {
      records
        .where('analytics.clicked_at BETWEEN :start AND :end', {
          start: dto.start_date,
          end: dto.end_date,
        })
        .getCount();
    }

    if (dto.browser) {
      records.where('analytics.browser = :browser', { browser: dto.browser });
    }

    if (dto.device) {
      records.where('analytics.device = :device', { device: dto.device });
    }

    if (dto.os) {
      records.where('analytics.os = :os', { os: dto.os });
    }

    if (dto.country) {
      records.where('analytics.country = :country', { country: dto.country });
    }

    return records.getMany();
  }
}
