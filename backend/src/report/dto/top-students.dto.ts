import { IsIn, IsOptional } from 'class-validator';
import { SUBJECT_GROUP_KEYS } from '../constants/subject-group.constant';

export class TopStudentsDto {
  @IsIn(SUBJECT_GROUP_KEYS, {
    message: `Group must be one of: ${SUBJECT_GROUP_KEYS.join(', ')}`,
  })
  group: string;

  @IsOptional()
  limit?: number = 10;
}
