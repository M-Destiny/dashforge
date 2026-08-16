import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Metric, User, Notification } from '../types';

interface DashboardState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  metrics: Metric[];
  users: User[];
  notifications: Notification[];
  toggleSidebar: () => void;
  toggleTheme: () => void;
  setMetrics: (metrics: Metric[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  markNotificationRead: (id: string) => void;
}

const mockMetrics: Metric[] = [
  { id: '1', label: 'Revenue', value: 84200, unit: '$', trend: 'up', trendValue: 12.5, color: 'blue' },
  { id: '2', label: 'Users', value: 12847, trend: 'up', trendValue: 8.2, color: 'green' },
  { id: '3', label: 'Sessions', value: 94210, trend: 'down', trendValue: 3.1, color: 'purple' },
  { id: '4', label: 'Bounce Rate', value: 24.3, unit: '%', trend: 'down', trendValue: 5.4, color: 'orange' },
];

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active', joinedAt: '2024-01-15', lastActive: '2024-02-20' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'editor', status: 'active', joinedAt: '2024-01-20', lastActive: '2024-02-19' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'viewer', status: 'inactive', joinedAt: '2024-02-01', lastActive: '2024-02-10' },
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'light',
      metrics: mockMetrics,
      users: mockUsers,
      notifications: [],
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setMetrics: (metrics) => set({ metrics }),
      addUser: (user) => set((s) => ({ users: [...s.users, user] })),
      updateUser: (id, data) => set((s) => ({
        users: s.users.map((u) => u.id === id ? { ...u, ...data } : u),
      })),
      markNotificationRead: (id) => set((s) => ({
        notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
      })),
    }),
    {
      name: 'dashforge-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        users: state.users,
      }),
    }
  )
);