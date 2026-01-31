import { IsOptional, IsIn } from 'class-validator';
import { SUBJECT_KEYS } from '../constants/subject.constant';

export class ScoreReportDto {
  @IsOptional()
  @IsIn(SUBJECT_KEYS, {
    message: `Subject must be one of: ${SUBJECT_KEYS.join(', ')}`,
  })
  subject?: string;
}
