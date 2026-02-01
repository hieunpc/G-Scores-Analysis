import { Link } from 'react-router-dom';

const Dashboard = () => {

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Chào mừng đến với hệ thống tra cứu điểm thi THPT
        </p>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Truy cập nhanh</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/check-score"
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Tra cứu điểm</p>
              <p className="text-sm text-gray-600">Tìm điểm theo SBD</p>
            </div>
          </Link>

          <Link
            to="/report"
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-green-500 hover:bg-green-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Báo cáo</p>
              <p className="text-sm text-gray-600">Thống kê điểm</p>
            </div>
          </Link>

          <Link
            to="/top-students"
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-yellow-500 hover:bg-yellow-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Top thí sinh</p>
              <p className="text-sm text-gray-600">Xem thí sinh xuất sắc</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
