import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UrlAnalyticsService } from './url-analytics.service';
import { AnalyticsFilterDto } from './dto/analytics-filter.dto';

@Controller('url-analytics')
export class UrlAnalyticsController {
  constructor(private readonly urlAnalyticsService: UrlAnalyticsService) {}

  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Get()
  async filter(@Query() dto: AnalyticsFilterDto) {
    const filteredAnalytics = await this.urlAnalyticsService.filter(dto);
    return {
      message: 'These are the filtered url analytics',
      data: { filteredAnalytics },
    };
  }
}
