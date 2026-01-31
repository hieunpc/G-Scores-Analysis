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
] as const;

export const SUBJECT_KEYS = SUBJECTS.map(s => s.key);

export type SubjectKey = typeof SUBJECTS[number]['key'];
