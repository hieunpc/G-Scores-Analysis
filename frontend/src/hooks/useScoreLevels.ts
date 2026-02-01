import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import type { ScoreLevel } from '../types/student.type';

export const useScoreLevels = (subject?: string) => {
  const [scoreLevels, setScoreLevels] = useState<Record<string, ScoreLevel>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchScoreLevels = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.getScoreLevels(subject);
      setScoreLevels(response.data || {});
    } catch (err) {
      setError('Không thể tải thống kê điểm.');
    } finally {
      setLoading(false);
    }
  }, [subject]);

  useEffect(() => {
    fetchScoreLevels();
  }, [fetchScoreLevels]);

  return {
    scoreLevels,
    loading,
    error,
    refetch: fetchScoreLevels,
  };
};
