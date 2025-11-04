import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';


@Injectable()
export class UrlAnalyticsService {

  constructor(
    @InjectQueue('url_analytics')
    private readonly analyticsQueue: Queue,
  ) {}
  
  async analytics(req: Request, urlId: string) {
    const userIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip;
    const userAgent = req.headers['user-agent'];

    await this.analyticsQueue.add('log_visit', {
      url_id: urlId,
      ip_address: userIp,
      user_agent: userAgent,
    }, {
      attempts : 3,
      removeOnComplete : 100,
      removeOnFail : 100,
    });
  }
}
