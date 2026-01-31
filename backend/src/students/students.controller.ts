import { Controller, Get, Param, Query, NotFoundException, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CheckScoreDto } from './dto/check-score.dto';
import { ScoreReportDto } from './dto/score-report.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('report/score-levels')
  async getScoreLevelReport(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: ScoreReportDto,
  ) {
    return this.studentsService.reportScoreLevel(query.subject);
  }

  @Get(':sbd')
  async getStudentByExamId(
    @Param(new ValidationPipe({ transform: true, whitelist: true }))
    params: CheckScoreDto,
  ) {
    const student = await this.studentsService.findByExamId(params.sbd);
    
    if (!student) {
      throw new NotFoundException(`Cannot find student with SBD: ${params.sbd}`);
    }

    return {
      success: true,
      data: student,
    };
  }
}
