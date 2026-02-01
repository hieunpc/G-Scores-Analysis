export const SUBJECTS = [
  { key: 'toan', name: 'Toán' },
  { key: 'ngu_van', name: 'Ngữ văn' },
  { key: 'ngoai_ngu', name: 'Ngoại ngữ' },
  { key: 'vat_li', name: 'Vật lý' },
  { key: 'hoa_hoc', name: 'Hóa học' },
  { key: 'sinh_hoc', name: 'Sinh học' },
  { key: 'lich_su', name: 'Lịch sử' },
  { key: 'dia_li', name: 'Địa lý' },
  { key: 'gdcd', name: 'GDCD' },
];

export type SubjectKey = (typeof SUBJECTS)[number]['key'];

export const SUBJECT_NAME_MAP = SUBJECTS.reduce<Record<string, string>>((acc, subject) => {
  acc[subject.key] = subject.name;
  return acc;
}, {});

export const SUBJECT_GROUPS = {
  A: { name: 'Khối A', subjects: ['toan', 'vat_li', 'hoa_hoc'] },
  B: { name: 'Khối B', subjects: ['toan', 'hoa_hoc', 'sinh_hoc'] },
  C: { name: 'Khối C', subjects: ['ngu_van', 'lich_su', 'dia_li'] },
  D: { name: 'Khối D', subjects: ['toan', 'ngu_van', 'ngoai_ngu'] },
};

export const SCORE_LEVELS = {
  '>=8': { label: 'Xuất sắc', color: 'bg-green-500', hex: '#10B981' },
  '6-8': { label: 'Giỏi', color: 'bg-blue-500', hex: '#3B82F6' },
  '4-6': { label: 'Khá', color: 'bg-yellow-500', hex: '#F59E0B' },
  '<4': { label: 'Trung bình', color: 'bg-red-500', hex: '#EF4444' },
};
