import { useDashboardStore } from '../store/dashboard';
import { AreaChartComponent, BarChartComponent } from '../components/Charts';
import { Calendar, Download, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Reports() {
  const { metrics } = useDashboardStore();
  const [dateRange, setDateRange] = useState('7d');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dateRanges = ['7d', '30d', '90d', '1y'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analytics overview and exportable reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
            >
              <Calendar size={16} />
              <span>{dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Last year'}</span>
              <ChevronDown size={16} />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => { setDateRange(range); setIsFilterOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${dateRange === range ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}`}
                  >
                    {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : range === '90d' ? 'Last 90 days' : 'Last year'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{m.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-bold">
                {m.unit}{typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
              </p>
              <span className={`text-sm font-medium ${m.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {m.trendValue}% vs prev
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Period: {dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Last year'}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartComponent />
        <BarChartComponent />
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold">Detailed Metrics</h2>
          <Filter size={18} className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Metric</th>
                <th className="text-left px-4 py-3 font-medium">Current Value</th>
                <th className="text-left px-4 py-3 font-medium">Previous Period</th>
                <th className="text-left px-4 py-3 font-medium">Change</th>
                <th className="text-left px-4 py-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {metrics.map((metric) => {
                const prevValue = Math.round(metric.value / (1 + metric.trendValue / 100));
                return (
                  <tr key={metric.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium">{metric.label}</td>
                    <td className="px-4 py-3">{metric.unit}{metric.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500">{metric.unit}{prevValue.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${metric.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {metric.trend === 'up' ? '▲ Improving' : '▼ Declining'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}