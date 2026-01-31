import { IsString, Matches, Length } from 'class-validator';

export class CheckScoreDto {
  @IsString({ message: 'SBD must be a string' })
  @Length(8, 8, { message: 'SBD must be exactly 8 digits' })
  @Matches(/^\d{8}$/, { message: 'SBD must contain only numbers' })
  sbd: string;
}
