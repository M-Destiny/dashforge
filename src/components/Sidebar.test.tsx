import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Sidebar from '@/components/Sidebar';
import { useDashboardStore } from '@/store/dashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

vi.mock('@/store/dashboard', () => ({
  useDashboardStore: vi.fn(),
}));

const renderSidebar = () => render(
  <MemoryRouter initialEntries={['/dashboard']}>
    <Sidebar />
  </MemoryRouter>
);

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders logo when not collapsed', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    expect(screen.getByText('DashForge')).toBeInTheDocument();
  });

  it('hides logo when collapsed', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: true,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    expect(screen.queryByText('DashForge')).not.toBeInTheDocument();
  });

  it('renders all navigation links with labels when not collapsed', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('hides link labels when collapsed', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: true,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
    expect(screen.queryByText('Reports')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('toggles sidebar on button click', () => {
    const mockToggleSidebar = vi.fn();
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: mockToggleSidebar,
    }));

    renderSidebar();
    const toggleButton = screen.getByRole('button', { name: /collapse/i });
    fireEvent.click(toggleButton);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  it('shows expand button when collapsed', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: true,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    const toggleButton = screen.getByRole('button', { name: /expand/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('applies correct active link styling', () => {
    vi.mocked(useDashboardStore).mockImplementation(() => ({
      sidebarCollapsed: false,
      theme: 'light',
      toggleSidebar: vi.fn(),
    }));

    renderSidebar();
    // Dashboard should be active by default
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('bg-blue-50');
  });
});