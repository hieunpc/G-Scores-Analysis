import React from 'react';
import { RANK_COLORS } from '../constants/theme';

interface RankBadgeProps {
  rank: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  const getColorClass = () => {
    if (rank === 1) return RANK_COLORS.FIRST;
    if (rank === 2) return RANK_COLORS.SECOND;
    if (rank === 3) return RANK_COLORS.THIRD;
    return RANK_COLORS.DEFAULT;
  };

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${getColorClass()}`}
    >
      {rank}
    </div>
  );
};
