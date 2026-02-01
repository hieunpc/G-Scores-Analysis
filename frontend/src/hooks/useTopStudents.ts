import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import type { TopStudent } from '../types/student.type';

export const useTopStudents = (group: string, limit = 10) => {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTopStudents = useCallback(async () => {
    if (!group) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.getTopStudents(group, limit);
      setStudents(response.data || []);
    } catch (err) {
      setError('Không thể tải danh sách thí sinh.');
    } finally {
      setLoading(false);
    }
  }, [group, limit]);

  useEffect(() => {
    fetchTopStudents();
  }, [fetchTopStudents]);

  return {
    students,
    loading,
    error,
    refetch: fetchTopStudents,
  };
};
