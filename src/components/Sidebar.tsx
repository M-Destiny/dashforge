import { NavLink } from 'react-router-dom';
import { useDashboardStore } from '../store/dashboard';
import { LayoutDashboard, Users, BarChart3, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const links = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', path: '/users', icon: Users },
  { id: 'reports', label: 'Reports', path: '/reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {!sidebarCollapsed && <span className="font-bold text-xl text-blue-600">DashForge</span>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {links.map(({ id, label, path, icon: Icon }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <Icon size={20} />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
