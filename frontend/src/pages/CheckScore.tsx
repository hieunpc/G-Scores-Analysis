import { useState } from 'react';
import { SUBJECT_NAME_MAP } from '../constants';
import { useStudentScore } from '../hooks/useStudentScore';
import { ScoreBadge } from '../components/ScoreBadge';
import { ErrorMessage, EmptyState } from '../components/UIStates';

const CheckScore = () => {
  const [sbd, setSbd] = useState('');
  const { student, loading, error, searchStudent, clearError } = useStudentScore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Searching SBD:', sbd);
    searchStudent(sbd);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Tra cứu điểm thi</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">Nhập số báo danh để xem điểm thi</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Nhập số báo danh (VD: 01001)"
                value={sbd}
                onChange={(e) => {
                  setSbd(e.target.value);
                  if (error) {
                    clearError();
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? 'Đang tìm...' : 'Tra cứu'}
          </button>
        </div>
      </form>

      {error && <ErrorMessage message={error} />}

      {student && (
        <div>
          <div className="mb-6 rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <p className="text-2xl font-bold text-gray-900">
              SBD: <span className="text-blue-600">{student.sbd}</span>
            </p>
            {student.ma_ngoai_ngu && (
              <p className="mt-1 text-sm text-gray-600">
                Mã ngoại ngữ: {student.ma_ngoai_ngu}
              </p>
            )}
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Môn thi
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Điểm số
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(student)
                  .filter(([key]) => key !== 'sbd' && key !== 'ma_ngoai_ngu')
                  .filter(([_, value]) => value !== null)
                  .map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {SUBJECT_NAME_MAP[key] || key}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ScoreBadge score={value as number} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!student && !error && !loading && (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
          title="Chưa có kết quả"
          description="Nhập số báo danh để tra cứu điểm thi"
        />
      )}
    </div>
  );
};

export default CheckScore;
