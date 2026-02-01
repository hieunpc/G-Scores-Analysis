import { SCORE_THRESHOLDS, SCORE_COLORS } from '../constants/theme';

export const getScoreColor = (score: number) => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return SCORE_COLORS.EXCELLENT;
  if (score >= SCORE_THRESHOLDS.GOOD) return SCORE_COLORS.GOOD;
  if (score >= SCORE_THRESHOLDS.AVERAGE) return SCORE_COLORS.AVERAGE;
  return SCORE_COLORS.POOR;
};

export const formatScore = (score: number | null) => {
  return score !== null ? score.toFixed(2) : '-';
};
