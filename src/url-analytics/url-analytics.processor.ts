import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlAnalytics } from './entities/url-analytics.entity';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-lite';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('url_analytics')
export class UrlAnalyticsProcessor extends WorkerHost {
  private readonly logger = new Logger(UrlAnalyticsProcessor.name);

  constructor(
    @InjectRepository(UrlAnalytics)
    private readonly urlAnalyticsRepo: Repository<UrlAnalytics>,
  ) {
    super();
  }

  async process(job: any) {
    const { url_id, ip_address, user_agent } = job.data;
    
    const parser = new UAParser(user_agent || '');
    const userAgentResult = parser.getResult();
    const geo = geoip.lookup(ip_address);

    const record = this.urlAnalyticsRepo.create({
      url: { id: url_id },
      ip_address: ip_address,
      user_agent: user_agent,
      browser: userAgentResult.browser?.name,
      os: userAgentResult.os?.name,
      device:
        userAgentResult.device?.model ||
        userAgentResult.device?.type ||
        userAgentResult.device?.vendor,
      country: geo.country,
    });

    await this.urlAnalyticsRepo.save(record);

    this.logger.log(`Saved analytics for ${ip_address}`);
    this.logger.debug({
      url_id,
      ip_address,
      user_agent,
      browser: userAgentResult.browser?.name,
      os: userAgentResult.os?.name,
      device:
        userAgentResult.device?.model ||
        userAgentResult.device?.type ||
        userAgentResult.device?.vendor,
    });
  }
}
