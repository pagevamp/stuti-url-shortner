import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { AuthGuard } from 'core/auth.guard';
import { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async shorten(@Body() dto: ShortenUrlDto) {
    const short_url = await this.urlService.shortenUrl(
      dto.user_id,
      dto.original_url,
      dto.expires_at,
    );
    return { message: 'The Url is shortened', data: { short_url } };
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { ttl: 1000, limit: 15 } })
  @HttpCode(HttpStatus.OK)
  @Get(':shortUrl')
  async getShortUrl(
    @Param('shortUrl') short_url: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.getOriginalUrl(short_url, req);
    res.redirect(originalUrl);
  }
}
