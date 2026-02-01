export interface Student {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
  ma_ngoai_ngu: string | null;
}

export interface StudentResponse {
  success: boolean;
  data: Student;
}

export type ScoreLevel = Record<string, number>;

export interface ScoreLevelResponse {
  success: boolean;
  data: Record<string, ScoreLevel>;
}

export interface TopStudent {
  sbd: string;
  scores: Record<string, number>;
  total: number;
}

export interface TopStudentsResponse {
  success: boolean;
  data: TopStudent[];
}
