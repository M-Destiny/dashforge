import { useDashboardStore } from '../store/dashboard';
import MetricCard from '../components/MetricCard';
import { AreaChartComponent, BarChartComponent } from '../components/Charts';

export default function Dashboard() {
  const { metrics } = useDashboardStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-sm text-gray-500">Last updated: just now</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartComponent />
        <BarChartComponent />
      </div>
    </div>
  );
}
