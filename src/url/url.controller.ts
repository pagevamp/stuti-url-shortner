import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllUrls(@Req() request: Request) {
    const user_id = request.user.sub;
    const urls = await this.urlService.getAllUrls(user_id);
    return {
      message: 'These are the urls of this user ',
      data: { urls },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async shorten(@Body() dto: ShortenUrlDto, @Req() req: Request) {
    const user_id = req.user.sub;
    const short_url = await this.urlService.shortenUrl(user_id, dto.original_url, dto.expires_at);
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Patch(':id')
  async updateUrl(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    const url = await this.urlService.updateUrl(id, updateUrlDto);
    return { message: 'The url has been updated successfully', data: { url } };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async removeUrl(@Param('id') id: string) {
    await this.urlService.removeUrl(id);
    return { message: 'The url has been deleted successfully' };
  }
}
