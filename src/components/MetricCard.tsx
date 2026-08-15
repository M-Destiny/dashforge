import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Metric } from '../types';

interface Props {
  metric: Metric;
}

export default function MetricCard({ metric }: Props) {
  const isUp = metric.trend === 'up';
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = metric.trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold">
          {metric.unit}{typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
        </p>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon size={16} />
          <span>{metric.trendValue}%</span>
        </div>
      </div>
    </div>
  );
}
