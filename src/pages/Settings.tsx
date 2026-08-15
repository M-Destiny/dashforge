import { useDashboardStore } from '../store/dashboard';
import { Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useDashboardStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <div>
          <h2 className="font-semibold mb-2">Appearance</h2>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
          </button>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Notifications</h2>
          <p className="text-sm text-gray-500">Notification preferences coming soon.</p>
        </div>
      </div>
    </div>
  );
}
