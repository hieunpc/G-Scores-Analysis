export const SCORE_THRESHOLDS = {
  EXCELLENT: 8,    // Giỏi
  GOOD: 6.5,       // Khá
  AVERAGE: 5,      // TB
};

export const SCORE_COLORS = {
  EXCELLENT: { bg: 'bg-green-100', text: 'text-green-800' },
  GOOD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  AVERAGE: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  POOR: { bg: 'bg-red-100', text: 'text-red-800' },
};

export const RANK_COLORS = {
  FIRST: 'bg-yellow-400 text-white',
  SECOND: 'bg-gray-400 text-white',
  THIRD: 'bg-orange-400 text-white',
  DEFAULT: 'bg-gray-200 text-gray-700',
};

export const VALIDATION = {
  TOP_STUDENTS_MIN: 1,
  TOP_STUDENTS_MAX: 1000,
  TOP_STUDENTS_DEFAULT: 10,
};
