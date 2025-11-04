import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { customAlphabet } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'utils/mail.service';
import { Cron, CronExpression } from '@nestjs/schedule';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

@Injectable()
export class UrlService {
  private readonly logger = new Logger('UrlService');
  constructor(
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async shortenUrl(user_id: string, original_url: string) {
    let short_url: string;

    do {
      short_url = nanoid();
    } while (await this.urlRepo.findOne({ where: { short_url } }));

    const expires_at = new Date(
      Date.now() + Number(this.configService.get('URL_EXPIRATION_TIME')) * 1000,
    );

    const url = this.urlRepo.create({
      original_url,
      short_url,
      expires_at,
      user: { id: user_id },
    });

    await this.urlRepo.save(url);

    return short_url;
  }

  async getOriginalUrl(short_url: string) {
    const url = await this.urlRepo.findOne({ where: { short_url } });
    if (!url) {
      throw new Error('Could not find the provided Short Url');
    }
    return url.original_url;
  }

  private async sendMailRecursive(expiredUrls: Url[], index = 0): Promise<void> {
    if (index >= expiredUrls.length) {
      this.logger.log('All expired URLs have been processed');
      return;
    }

    const url = expiredUrls[index];

    try {
      await this.mailService.sendMail(url.user.email, {
        template: 'url-expired',
        from: this.configService.get('EMAIL_USER'),
        to: url.user.email,
        subject: `Your short url has expired`,
        project: '.SUS',
        url: url.original_url,
        expiresAt: url.expires_at.toUTCString(),
      });

      url.notified = true;

      await this.urlRepo.save(url);
      this.logger.log(`Sent expiration email to ${url.user.email}`);
    } catch (err) {
      this.logger.error(`Failed to send email to ${url.user.email}: ${err.message}`);
    }

    await this.sendMailRecursive(expiredUrls, index + 1);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async scheduledNotification() {
    const now = new Date();
    const expiredUrls = await this.urlRepo.find({
      where: { expires_at: LessThanOrEqual(now), notified: false },
      relations: ['user'],
    });

    if (expiredUrls.length === 0) {
      this.logger.log('No expired URLs found at this time range');
      return;
    }

    this.logger.log(`Found ${expiredUrls.length} expired URLs to notify`);
    await this.sendMailRecursive(expiredUrls);
  }
}
