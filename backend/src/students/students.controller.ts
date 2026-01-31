import { Controller, Get, Param, NotFoundException, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CheckScoreDto } from './dto/check-score.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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
