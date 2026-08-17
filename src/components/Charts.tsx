import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const areaData = [
  { date: 'Mon', value: 4200 },
  { date: 'Tue', value: 3800 },
  { date: 'Wed', value: 5100 },
  { date: 'Thu', value: 4600 },
  { date: 'Fri', value: 6200 },
  { date: 'Sat', value: 5300 },
  { date: 'Sun', value: 4900 },
];

const barData = [
  { page: '/dashboard', views: 12400 },
  { page: '/users', views: 8300 },
  { page: '/reports', views: 5900 },
  { page: '/settings', views: 3100 },
  { page: '/api', views: 2700 },
];

export function AreaChartComponent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-4">Weekly Sessions</h3>
      <div data-testid="area-chart">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BarChartComponent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-4">Top Pages</h3>
      <div data-testid="bar-chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={12} />
            <YAxis dataKey="page" type="category" fontSize={11} width={80} />
            <Tooltip />
            <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
