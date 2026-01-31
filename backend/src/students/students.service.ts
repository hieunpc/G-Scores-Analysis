import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan, And } from 'typeorm';
import { Student } from './entities/student.entity';
import { SUBJECTS } from './constants/subject.constant';
import { SCORE_LEVELS } from './constants/score-level.constant';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findByExamId(sbd: string): Promise<Student | null> {
    return this.studentRepository.findOne({
      where: { sbd },
    });
  }

  async reportScoreLevel(subjectFilter?: string) {
    const subjects = subjectFilter
      ? SUBJECTS.filter((s) => s.key === subjectFilter)
      : SUBJECTS;

    const result = {};

    for (const subject of subjects) {
      const counts = await Promise.all(
        Object.values(SCORE_LEVELS).map(async (level) => {
          let condition;

          if (level.min !== null && level.max !== null) {
            condition = And(MoreThanOrEqual(level.min), LessThan(level.max));
          } else if (level.min !== null) {
            condition = MoreThanOrEqual(level.min);
          } else if (level.max !== null) {
            condition = LessThan(level.max);
          }

          const count = await this.studentRepository.count({
            where: { [subject.key]: condition },
          });

          return { key: level.key, count };
        }),
      );

      result[subject.key] = counts.reduce((acc, { key, count }) => {
        acc[key] = count;
        return acc;
      }, {});
    }

    return result;
  }
}
