import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
  ) {}

  async shortenUrl(user_id: string, original_url: string) {
    let short_url: string;

    do {
      short_url = nanoid();
    } while (await this.urlRepo.findOne({ where: { short_url } }));

    const url = this.urlRepo.create({
      original_url,
      short_url,
      user: { id: user_id },
    });

    await this.urlRepo.save(url);

    return short_url;
  }

  async getOriginalUrl(short_url: string) {
    const url = await this.urlRepo.findOne({ where: { short_url } });
    if (!url) throw new Error('Could not find the provided Short Url');
    return url.original_url;
  }
}
