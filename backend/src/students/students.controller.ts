import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':sbd')
  async getStudentByExamId(@Param('sbd') sbd: string) {
    const student = await this.studentsService.findByExamId(sbd);
    
    if (!student) {
      throw new NotFoundException(`Cannot find student with SBD: ${sbd}`);
    }

    return {
      success: true,
      data: student,
    };
  }
}
