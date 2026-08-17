import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TopBar from '@/components/TopBar';
import { useDashboardStore } from '@/store/dashboard';
import '@testing-library/jest-dom';

vi.mock('@/store/dashboard', () => ({
  useDashboardStore: vi.fn(),
}));

const mockNotifications = [
  { id: '1', message: 'Test notification 1', type: 'info' as const, read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '2', message: 'Test notification 2', type: 'success' as const, read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '3', message: 'Test notification 3', type: 'warning' as const, read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];

describe('TopBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders title and notification bell', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: [],
      toggleTheme: vi.fn(),
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    expect(screen.getByText('DashForge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('shows unread count badge', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: mockNotifications,
      toggleTheme: vi.fn(),
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    const bellButton = screen.getByRole('button', { name: /notifications, 2 unread/i });
    expect(bellButton).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('opens notification dropdown on click', () => {
    const mockMarkRead = vi.fn();
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: mockNotifications,
      toggleTheme: vi.fn(),
      markNotificationRead: mockMarkRead,
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /notifications, 2 unread/i }));

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Mark all read')).toBeInTheDocument();
    expect(screen.getByText('Test notification 1')).toBeInTheDocument();
    expect(screen.getByText('Test notification 2')).toBeInTheDocument();
    expect(screen.getByText('Test notification 3')).toBeInTheDocument();
  });

  it('marks notification as read on click', () => {
    const mockMarkRead = vi.fn();
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: mockNotifications,
      toggleTheme: vi.fn(),
      markNotificationRead: mockMarkRead,
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /notifications, 2 unread/i }));
    fireEvent.click(screen.getByText('Test notification 1'));

    expect(mockMarkRead).toHaveBeenCalledWith('1');
  });

  it('marks all as read', () => {
    const mockMarkRead = vi.fn();
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: mockNotifications,
      toggleTheme: vi.fn(),
      markNotificationRead: mockMarkRead,
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /notifications, 2 unread/i }));
    fireEvent.click(screen.getByText('Mark all read'));

    expect(mockMarkRead).toHaveBeenCalledTimes(2);
    expect(mockMarkRead).toHaveBeenCalledWith('1');
    expect(mockMarkRead).toHaveBeenCalledWith('2');
  });

  it('shows empty state when no notifications', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: [],
      toggleTheme: vi.fn(),
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(screen.getByText('No notifications yet')).toBeInTheDocument();
  });

  it('toggles theme on settings dropdown click', () => {
    const mockToggleTheme = vi.fn();
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: [],
      toggleTheme: mockToggleTheme,
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    fireEvent.click(screen.getByText('Switch to Dark Mode'));

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('shows moon icon in light mode', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: [],
      toggleTheme: vi.fn(),
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton.querySelector('svg')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      theme: 'light',
      notifications: mockNotifications,
      toggleTheme: vi.fn(),
      markNotificationRead: vi.fn(),
    }));

    render(<TopBar />);
    fireEvent.click(screen.getByRole('button', { name: /notifications, 2 unread/i }));
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });
});