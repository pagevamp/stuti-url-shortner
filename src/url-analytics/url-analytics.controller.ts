import { Controller, Get, Query } from '@nestjs/common';
import { UrlAnalyticsService } from './url-analytics.service';
import { AnalyticsFilterDto } from './dto/analytics-filter.dto';

@Controller('url_analytics')
export class UrlAnalyticsController {
  constructor(private readonly urlAnalyticsService: UrlAnalyticsService) {}

  @Get()
  async filter(@Query() dto: AnalyticsFilterDto) {
    const filter = Object.values(dto).some((val) => val !== undefined && val !== null);

    if (!filter) {
      const analytics = await this.urlAnalyticsService.getAllAnalytics();
      const count = analytics.length;
      return {
        message: `These are the url analytics`,
        count: { count },
        data: { analytics },
      };
    }

    const filtered_analytics = await this.urlAnalyticsService.filter(dto);
    const filtered_count = filtered_analytics.length;
    return {
      message: 'These are the filtered url analytics',
      count: { filtered_count },
      data: { filtered_analytics },
    };
  }
}
