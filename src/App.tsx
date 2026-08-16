import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDashboardStore } from './store/dashboard';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  const { sidebarCollapsed, theme } = useDashboardStore();

  return (
    <BrowserRouter>
      <div className={`${theme}`}>
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
          <Sidebar />
          <main className={`flex-1 overflow-auto p-6 transition-all ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
