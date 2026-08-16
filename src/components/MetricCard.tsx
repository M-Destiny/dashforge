import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Metric } from '../types';

interface Props {
  metric: Metric;
}

export default function MetricCard({ metric }: Props) {
  let TrendIcon;
  let trendColor;
  let trendPrefix = '';

  switch (metric.trend) {
    case 'up':
      TrendIcon = TrendingUp;
      trendColor = 'text-green-500';
      trendPrefix = '+';
      break;
    case 'down':
      TrendIcon = TrendingDown;
      trendColor = 'text-red-500';
      trendPrefix = '-';
      break;
    case 'flat':
    default:
      TrendIcon = Minus;
      trendColor = 'text-gray-500';
      break;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold">
          {metric.unit}{typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
        </p>
        <div className={`flex items-center gap-1 text-sm font-medium`}>
          <TrendIcon size={16} className={trendColor} />
          <span className={trendColor} data-testid="metric-trend">{trendPrefix}{metric.trendValue}%</span>
        </div>
      </div>
    </div>
  );
}
