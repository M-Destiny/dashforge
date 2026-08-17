import { act } from '@testing-library/react';
import { useDashboardStore } from '@/store/dashboard';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { localStorageMock } from '../../vitest.setup';

describe('Dashboard Store', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    // Reset to initial state
    useDashboardStore.setState({
      sidebarCollapsed: false,
      theme: 'light',
      metrics: [
        {
          id: '1',
          label: 'Revenue',
          value: 84200,
          unit: '$',
          trend: 'up',
          trendValue: 12.5,
          color: 'blue',
        },
        { id: '2', label: 'Users', value: 12847, trend: 'up', trendValue: 8.2, color: 'green' },
        {
          id: '3',
          label: 'Sessions',
          value: 94210,
          trend: 'down',
          trendValue: 3.1,
          color: 'purple',
        },
        {
          id: '4',
          label: 'Bounce Rate',
          value: 24.3,
          unit: '%',
          trend: 'down',
          trendValue: 5.4,
          color: 'orange',
        },
      ],
      users: [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          role: 'admin',
          status: 'active',
          joinedAt: '2024-01-15',
          lastActive: '2024-02-20',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@example.com',
          role: 'editor',
          status: 'active',
          joinedAt: '2024-01-20',
          lastActive: '2024-02-19',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        },
        {
          id: '3',
          name: 'Carol Davis',
          email: 'carol@example.com',
          role: 'viewer',
          status: 'inactive',
          joinedAt: '2024-02-01',
          lastActive: '2024-02-10',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
        },
      ],
      notifications: [
        {
          id: '1',
          message: 'New user Alice Johnson signed up',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        },
        {
          id: '2',
          message: 'Revenue increased by 12.5% this week',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: '3',
          message: 'Server maintenance scheduled for tonight',
          type: 'warning',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
      ],
    });
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('initializes with default values', () => {
    const state = useDashboardStore.getState();
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.theme).toBe('light');
    expect(state.metrics.length).toBe(4);
    expect(state.users.length).toBe(3);
    expect(state.notifications.length).toBe(3);
  });

  it('toggles sidebar', () => {
    const { toggleSidebar } = useDashboardStore.getState();
    act(() => {
      toggleSidebar();
    });
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(true);
    act(() => {
      toggleSidebar();
    });
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(false);
  });

  it('toggles theme', () => {
    const { toggleTheme } = useDashboardStore.getState();
    act(() => {
      toggleTheme();
    });
    expect(useDashboardStore.getState().theme).toBe('dark');
    act(() => {
      toggleTheme();
    });
    expect(useDashboardStore.getState().theme).toBe('light');
  });

  it('adds user', () => {
    const { addUser, users } = useDashboardStore.getState();
    const initialCount = users.length;
    act(() => {
      addUser({
        id: '4',
        name: 'Test User',
        email: 'test@example.com',
        role: 'viewer',
        status: 'active',
        joinedAt: '2024-03-01',
        lastActive: '2024-03-01',
        avatar: '',
      });
    });
    expect(useDashboardStore.getState().users.length).toBe(initialCount + 1);
  });

  it('updates user', () => {
    const { updateUser } = useDashboardStore.getState();
    act(() => {
      updateUser('1', { name: 'Updated Name' });
    });
    expect(useDashboardStore.getState().users[0].name).toBe('Updated Name');
  });

  it('adds notification', () => {
    const { addNotification, notifications } = useDashboardStore.getState();
    const initialCount = notifications.length;
    act(() => {
      addNotification({ message: 'Test notification', type: 'info', read: false });
    });
    expect(useDashboardStore.getState().notifications.length).toBe(initialCount + 1);
    expect(useDashboardStore.getState().notifications[0].message).toBe('Test notification');
  });

  it('marks notification as read', () => {
    const { markNotificationRead, notifications } = useDashboardStore.getState();
    const unreadId = notifications.find((n) => !n.read)?.id;
    expect(unreadId).toBeDefined();
    act(() => {
      markNotificationRead(unreadId!);
    });
    expect(useDashboardStore.getState().notifications.find((n) => n.id === unreadId)?.read).toBe(
      true
    );
  });

  it('clears all notifications', () => {
    const { clearNotifications } = useDashboardStore.getState();
    act(() => {
      clearNotifications();
    });
    expect(useDashboardStore.getState().notifications.length).toBe(0);
  });

  it('persists sidebarCollapsed to localStorage', () => {
    const { toggleSidebar } = useDashboardStore.getState();
    act(() => {
      toggleSidebar();
    });
    const store = localStorageMock._getStore();
    const stored = JSON.parse(store['dashforge-storage'] as string);
    expect(stored.state.sidebarCollapsed).toBe(true);
  });

  it('persists theme to localStorage', () => {
    const { toggleTheme } = useDashboardStore.getState();
    act(() => {
      toggleTheme();
    });
    const store = localStorageMock._getStore();
    const stored = JSON.parse(store['dashforge-storage'] as string);
    expect(stored.state.theme).toBe('dark');
  });
});
