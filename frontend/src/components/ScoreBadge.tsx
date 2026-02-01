import React from 'react';
import { getScoreColor, formatScore } from '../utils/scoreHelpers';

interface ScoreBadgeProps {
  score: number | null;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, className = '' }) => {
  if (score === null) {
    return <span className="text-gray-400">-</span>;
  }

  const colors = getScoreColor(score);

  return (
    <span
      className={`inline-flex rounded-full px-4 py-1.5 text-base font-semibold ${colors.bg} ${colors.text} ${className}`}
    >
      {formatScore(score)}
    </span>
  );
};
