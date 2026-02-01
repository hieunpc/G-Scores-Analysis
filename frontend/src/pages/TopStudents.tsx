import { useMemo, useState } from 'react';
import { SUBJECT_GROUPS, SUBJECT_NAME_MAP } from '../constants';
import { VALIDATION } from '../constants/theme';
import { useTopStudents } from '../hooks/useTopStudents';
import { SelectInput, NumberInput } from '../components/FormInputs';
import { RankBadge } from '../components/RankBadge';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/UIStates';
import { formatScore } from '../utils/scoreHelpers';

const TopStudents = () => {
  const groupOptions = useMemo(
    () => Object.entries(SUBJECT_GROUPS).map(([id, config]) => ({
      id,
      name: config.name,
      subjects: config.subjects,
    })),
    [],
  );

  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]?.id ?? 'A');
  const [limit, setLimit] = useState(VALIDATION.TOP_STUDENTS_DEFAULT);
  const { students, loading, error } = useTopStudents(selectedGroup, limit);

  const currentGroup = SUBJECT_GROUPS[selectedGroup as keyof typeof SUBJECT_GROUPS] ?? Object.values(SUBJECT_GROUPS)[0];
  const groupSubjects = currentGroup?.subjects ?? [];

  const groupSelectOptions = useMemo(
    () =>
      groupOptions.map((group) => ({
        value: group.id,
        label: `${group.name} - ${group.subjects.map((s) => SUBJECT_NAME_MAP[s]).join(', ')}`,
      })),
    [groupOptions],
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Top thí sinh</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Học sinh có điểm cao nhất theo từng khối thi
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <SelectInput
          id="group-select"
          label="Khối thi"
          value={selectedGroup}
          onChange={setSelectedGroup}
          options={groupSelectOptions}
          className="flex-1 sm:w-auto"
        />

        <NumberInput
          id="limit-input"
          label="Số lượng"
          value={limit}
          onChange={setLimit}
          min={VALIDATION.TOP_STUDENTS_MIN}
          max={VALIDATION.TOP_STUDENTS_MAX}
          placeholder="Nhập số..."
          className="w-[180px]"
        />

        <div className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-700">
          <span className="font-semibold">{students.length}</span> thí sinh
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  SBD
                </th>
                {groupSubjects.map((subject) => (
                  <th key={subject} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {SUBJECT_NAME_MAP[subject] || subject}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tổng điểm
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr
                  key={student.sbd}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <RankBadge rank={index + 1} />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.sbd}
                  </td>
                  {groupSubjects.map((subject) => (
                    <td key={subject} className="px-6 py-4 text-gray-900">
                      {formatScore(student.scores?.[subject] ?? null)}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                      {student.total?.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && students.length === 0 && (
        <EmptyState
          icon={
            <svg
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          title="Chưa có dữ liệu"
          description="Không tìm thấy học sinh"
        />
      )}
    </div>
  );
};

export default TopStudents;
