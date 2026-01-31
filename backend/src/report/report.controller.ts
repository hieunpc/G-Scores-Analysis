import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ScoreReportDto } from './dto/score-report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('score-levels')
  async getScoreLevelReport(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: ScoreReportDto,
  ) {
    return this.reportService.getScoreLevelReport(query.subject);
  }
}
