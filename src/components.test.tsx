import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MetricCard from '@/components/MetricCard';
import UserTable from '@/components/UserTable';
import { AreaChartComponent, BarChartComponent } from '@/components/Charts';
import '@testing-library/jest-dom';

describe('MetricCard', () => {
  const defaultMetric = {
    id: '1',
    label: 'Revenue',
    value: 84200,
    unit: '$',
    trend: 'up' as const,
    trendValue: 12.5,
    color: 'blue',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders metric label', () => {
    render(<MetricCard metric={defaultMetric} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders formatted value with unit', () => {
    render(<MetricCard metric={defaultMetric} />);
    expect(screen.getByText('$84,200')).toBeInTheDocument();
  });

  it('shows positive trend in green', () => {
    render(<MetricCard metric={defaultMetric} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    const trend = screen.getByText('+12.5%');
    expect(trend).toHaveClass('text-green-500');
  });

  it('shows negative trend in red', () => {
    render(<MetricCard metric={{ ...defaultMetric, trend: 'down' as const, trendValue: 5.2 }} />);
    expect(screen.getByText('-5.2%')).toBeInTheDocument();
    const trend = screen.getByText('-5.2%');
    expect(trend).toHaveClass('text-red-500');
  });

  it('shows flat trend correctly', () => {
    render(<MetricCard metric={{ ...defaultMetric, trend: 'flat' as const, trendValue: 0 }} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});

describe('UserTable', () => {
  const mockUsers = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'admin' as const,
      status: 'active' as const,
      joinedAt: '2024-01-15',
      lastActive: '2024-02-20',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'editor' as const,
      status: 'inactive' as const,
      joinedAt: '2024-01-20',
      lastActive: '2024-02-19',
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'viewer' as const,
      status: 'banned' as const,
      joinedAt: '2024-02-01',
      lastActive: '2024-02-10',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all users', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Carol Davis')).toBeInTheDocument();
  });

  it('renders user emails', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders role badges', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('editor')).toBeInTheDocument();
    expect(screen.getByText('viewer')).toBeInTheDocument();
  });

  it('renders status badges with correct colors', () => {
    render(<UserTable users={mockUsers} />);
    // Active should be green
    const activeBadge = screen.getByText('active');
    expect(activeBadge).toHaveClass('bg-green-100');
    // Inactive should be yellow
    const inactiveBadge = screen.getByText('inactive');
    expect(inactiveBadge).toHaveClass('bg-yellow-100');
    // Banned should be red
    const bannedBadge = screen.getByText('banned');
    expect(bannedBadge).toHaveClass('bg-red-100');
  });

  it('filters users by search', () => {
    render(<UserTable users={mockUsers} />);
    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Carol Davis')).not.toBeInTheDocument();
  });
});

describe('Charts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders AreaChartComponent', () => {
    render(<AreaChartComponent />);
    expect(screen.getByText('Weekly Sessions')).toBeInTheDocument();
    // Check for chart container
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  }, 15000);

  it('renders BarChartComponent', () => {
    render(<BarChartComponent />);
    expect(screen.getByText('Top Pages')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  }, 15000);
});
