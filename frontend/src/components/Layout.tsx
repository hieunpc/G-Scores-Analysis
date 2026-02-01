import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Sidebar />
      <main className="min-h-screen pl-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
