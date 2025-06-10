import { ChartOptions } from 'chart.js';

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

export const defaultLineChartOptions = {
  ...baseOptions,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
} as const;

export const defaultBarChartOptions = {
  ...baseOptions,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
} as const;

export const defaultDoughnutChartOptions = {
  ...baseOptions,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
  cutout: '70%',
} as const;

export const chartColors = {
  primary: '#8B5CF6',
  secondary: '#A855F7',
  tertiary: '#7E22CE',
  quaternary: '#D8B4FE',
} as const;

export const getGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
  return gradient;
}; 