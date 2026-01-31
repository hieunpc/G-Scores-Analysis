import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan, And } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { SUBJECTS } from './constants/subject.constant';
import { SCORE_LEVELS } from './constants/score-level.constant';
import { SUBJECT_GROUPS } from './constants/subject-group.constant';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getScoreLevelReport(subjectFilter?: string) {
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

  async getTopStudentsByGroup(group: string, limit = 10) {
    const groupInfo = SUBJECT_GROUPS[group];
    if (!groupInfo) {
      throw new BadRequestException(`Invalid subject group: ${group}`);
    }

    const subjects = groupInfo.subjects;

    const query = this.studentRepository
      .createQueryBuilder('student')
      .select('student.sbd', 'sbd');

    subjects.forEach((subject) => {
      query.addSelect(`student.${subject}`, subject);
    });

    const totalScoreExpr = subjects
      .map((subject) => `COALESCE(student.${subject}, 0)`)
      .join(' + ');

    query
      .addSelect(totalScoreExpr, 'total')
      .orderBy('total', 'DESC')
      .limit(limit);

    const rawStudents = await query.getRawMany();

    return rawStudents.map((row) => ({
      sbd: row.sbd,
      scores: subjects.reduce(
        (scores, subject) => {
          scores[subject] = Number(row[subject] ?? 0);
          return scores;
        },
        {} as Record<string, number>,
      ),
      total: Number(row.total),
    }));
  }
}
