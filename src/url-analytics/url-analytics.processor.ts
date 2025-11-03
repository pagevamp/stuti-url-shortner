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

  async process(job: Job) {
    try {
      const { url_id, ip_address, user_agent } = job.data;

      const parser = new UAParser(user_agent || '');
      const userAgentResult = parser.getResult();
      const geo = geoip.lookup(ip_address);

      const record = this.urlAnalyticsRepo.create({
        url: { id: url_id },
        ip_address: ip_address ?? null,
        country: geo?.country ?? null,
        user_agent: user_agent ?? null,
        browser: userAgentResult.browser?.name ?? null,
        os: userAgentResult.os?.name ?? null,
        device:
          userAgentResult.device?.model ||
          userAgentResult.device?.type ||
          userAgentResult.device?.vendor ||
          null,
      });

      await this.urlAnalyticsRepo.save(record);

      this.logger.log(`Saved analytics for ${ip_address}`);
      this.logger.debug({
        url_id,
        ip_address,
        user_agent,
        country: geo?.country ?? null,
        browser: userAgentResult.browser?.name,
        os: userAgentResult.os?.name,
        device:
          userAgentResult.device?.model ||
          userAgentResult.device?.type ||
          userAgentResult.device?.vendor,
      });
    } catch (err) {
      this.logger.error(`Failed to process the job due to: ${err.message}`);
    }
  }
}
