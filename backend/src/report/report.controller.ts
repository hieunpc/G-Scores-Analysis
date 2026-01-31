import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ScoreReportDto } from './dto/score-report.dto';
import { TopStudentsDto } from './dto/top-students.dto';

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

  @Get('top-students')
  async getTopStudents(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: TopStudentsDto,
  ) {
    return this.reportService.getTopStudentsByGroup(query.group, query.limit);
  }
}
