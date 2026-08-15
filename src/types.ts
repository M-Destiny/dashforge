export interface Metric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: number; // percentage
  color: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: string | number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'banned';
  joinedAt: string;
  lastActive: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface SidebarLink {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
}
