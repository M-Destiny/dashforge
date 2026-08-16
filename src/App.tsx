import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDashboardStore } from './store/dashboard';
import Sidebar from './components/Sidebar';
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.default })));
const Users = lazy(() => import('./pages/Users').then(m => ({ default: m.default })));
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.default })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.default })));

function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

export default function App() {
  const { sidebarCollapsed, theme } = useDashboardStore();

  return (
    <BrowserRouter>
      <div className={`${theme}`}>
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
          <Sidebar />
          <main className={`flex-1 overflow-auto p-6 transition-all ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
