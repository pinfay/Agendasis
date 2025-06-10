import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type ChartType = 'line' | 'bar' | 'doughnut';

interface ChartProps {
  type: ChartType;
  data: any;
  options?: any;
  height?: number;
  width?: number;
}

export default function Chart({ type, data, options, height, width }: ChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ height, width }} className="animate-pulse bg-gray-200 rounded" />;
  }

  const chartProps = {
    data,
    options,
    height,
    width,
  };

  switch (type) {
    case 'line':
      return <Line {...chartProps} />;
    case 'bar':
      return <Bar {...chartProps} />;
    case 'doughnut':
      return <Doughnut {...chartProps} />;
    default:
      return null;
  }
} 