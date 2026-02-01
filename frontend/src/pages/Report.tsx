import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SCORE_LEVELS, SUBJECT_NAME_MAP } from '../constants';
import { useScoreLevels } from '../hooks/useScoreLevels';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/UIStates';

const Report = () => {
  const { scoreLevels, loading, error } = useScoreLevels();

  const chartData = useMemo(() =>
    Object.entries(scoreLevels).map(([subjectKey, levels]) => ({
      subjectKey,
      subject: SUBJECT_NAME_MAP[subjectKey] || subjectKey,
      ...levels, // Spread all level keys (excellent, good, etc.)
    })),
  [scoreLevels]);

  const levelConfig = useMemo(
    () => Object.entries(SCORE_LEVELS).map(([key, config]) => ({
      key,
      label: config.label,
      colorClass: config.color,
      hex: config.hex,
    })),
    [],
  );

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Báo cáo thống kê</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Phân bổ học sinh theo từng mức điểm và môn học
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        {levelConfig.map(({ key, label, hex }) => (
          <div key={key} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ backgroundColor: hex }}></div>
            <span className="text-sm text-gray-700">
              {label} ({key})
            </span>
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && chartData.length > 0 && (
        <div className="space-y-8">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">
              Biểu đồ cột xếp chồng
            </h2>
            <div className="h-[350px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="subject"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    style={{ fontSize: '10px' }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis style={{ fontSize: '10px' }} tick={{ fontSize: 10 }} />
<YAxis style={{ fontSize: '10px' }} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number | undefined) => value?.toLocaleString() || '0'}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }}
                    iconSize={10}
                    formatter={(value: string) => {
                      const config = SCORE_LEVELS[value as keyof typeof SCORE_LEVELS];
                      return config ? `${config.label}` : value;
                    }}
                  />
                  {levelConfig.map(({ key, hex }) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId="a"
                      fill={hex}
                      name={key}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">
              Biểu đồ cột nhóm
            </h2>
            <div className="h-[350px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="subject"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    style={{ fontSize: '10px' }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis style={{ fontSize: '10px' }} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number | undefined) => value?.toLocaleString() || '0'}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }}
                    iconSize={10}
                    formatter={(value: string) => {
                      const config = SCORE_LEVELS[value as keyof typeof SCORE_LEVELS];
                      return config ? `${config.label}` : value;
                    }}
                  />
                  {levelConfig.map(({ key, hex }) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={hex}
                      name={key}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">
              Bảng dữ liệu chi tiết
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                      Môn học
                    </th>
                    {levelConfig.map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700"
                      >
                        {label}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {chartData.map((item) => {
                    const dataItem = item as Record<string, string | number>;
                    const total = levelConfig.reduce(
                      (sum, { key }) => sum + (Number(dataItem[key]) || 0),
                      0,
                    );

                    return (
                      <tr key={item.subjectKey} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {item.subject}
                        </td>
                        {levelConfig.map(({ key }) => (
                          <td
                            key={`${item.subjectKey}-${key}`}
                            className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700"
                          >
                            {(Number(dataItem[key]) || 0).toLocaleString()}
                          </td>
                        ))}
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
                          {total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && chartData.length === 0 && (
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          title="Chưa có dữ liệu"
          description="Không có dữ liệu thống kê"
        />
      )}
    </div>
  );
};

export default Report;
