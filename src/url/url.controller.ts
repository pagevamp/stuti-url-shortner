import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { AuthGuard } from 'auth/auth.guard';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard)
  @Post('shorten-url')
  async shorten(@Body() dto: ShortenUrlDto) {
    const short_url = await this.urlService.shortenUrl(dto.user_id, dto.original_url);
    return { message: 'The Url is shortened', data: { short_url } };
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { ttl: 1000, limit: 15 } })
  @Get(':shortUrl')
  async getShortUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    res.redirect(originalUrl);
  }
}
