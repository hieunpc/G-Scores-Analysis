import type { Student } from '../types/student.type';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(await response.text() || 'Request failed');
  }
  return response.json();
};

const normalizeStudent = (student: Student) => {
  const scoreKeys: Array<keyof Student> = [
    'toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc',
    'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'
  ];

  const normalized = { ...student } as Record<string, string | number | null>;
  scoreKeys.forEach(key => {
    if (student[key] !== null) {
      normalized[key as string] = Number(student[key]);
    }
  });

  return normalized as unknown as Student;
};

export const api = {
  async getStudent(sbd: string) {
    const response = await fetch(`${API_BASE_URL}/students/${sbd}`);
    const result = await handleResponse(response);
    
    if (result?.data) {
      result.data = normalizeStudent(result.data);
    }
    
    return result;
  },

  async getScoreLevels(subject?: string) {
    const url = subject 
      ? `${API_BASE_URL}/report/score-levels?subject=${subject}`
      : `${API_BASE_URL}/report/score-levels`;
    const response = await fetch(url);
    const data = await handleResponse(response);
    return { data };
  },

  async getTopStudents(group: string, limit = 10) {
    const url = `${API_BASE_URL}/report/top-students?group=${group}&limit=${limit}`;
    const response = await fetch(url);
    const data = await handleResponse(response);
    return { data };
  },
};
