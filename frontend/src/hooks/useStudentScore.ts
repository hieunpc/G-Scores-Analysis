import { useCallback, useState } from 'react';
import { api } from '../services/api';
import type { Student } from '../types/student.type';

export const useStudentScore = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const searchStudent = useCallback(async (rawSbd: string) => {
    const sbd = rawSbd.trim();

    if (!sbd) {
      setError('Vui lòng nhập số báo danh');
      setStudent(null);
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);

    try {
      const response = await api.getStudent(sbd);
      setStudent(response.data);
    } catch (err) {
      setError('Không tìm thấy thí sinh. Vui lòng kiểm tra lại số báo danh.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setStudent(null);
    setError('');
  }, []);

  return {
    student,
    loading,
    error,
    searchStudent,
    clearError,
    reset,
  };
};
