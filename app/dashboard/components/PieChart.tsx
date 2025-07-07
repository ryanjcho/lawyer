import React, { useRef, useEffect, useState } from 'react';

interface PieData {
  label: string;
  value: number;
  color: string;
  gradient?: string;
}

interface PieChartProps {
  data: PieData[];
}

const COLORS = [
  '#2563eb', // Blue
  '#10b981', // Emerald
  '#6366f1', // Indigo
  '#f59e42', // Amber
  '#14b8a6', // Teal
  '#64748b', // Slate
  '#a3a3a3', // Gray
  '#ef4444', // Red (for risk/alert)
];

const GRADIENTS = [
  'url(#grad1)',
  'url(#grad2)',
  'url(#grad3)',
  'url(#grad4)',
  'url(#grad5)',
  'url(#grad6)',
  'url(#grad7)',
  'url(#grad8)',
];

export default function PieChart({ data }: PieChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 70;
  const center = 80;
  const gap = 2; // degrees between slices

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  // Accessibility: ARIA labels for each slice
  const getAriaLabel = (d: PieData, percent: number) =>
    `${d.label}: ${d.value} (${percent.toFixed(1)}%)`;

  // Pie slices
  let cumulative = 0;
  const slices = data.map((d, i) => {
    const value = d.value;
    const percent = (value / total) * 100;
    const startAngle = (cumulative / total) * 360;
    const endAngle = ((cumulative + value) / total) * 360 - gap;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = center + radius * Math.sin(rad(startAngle));
    const y1 = center - radius * Math.cos(rad(startAngle));
    const x2 = center + radius * Math.sin(rad(endAngle));
    const y2 = center - radius * Math.cos(rad(endAngle));
    const pathData = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
    cumulative += value;
    // Animation: interpolate endAngle
    const animatedEnd = animated ? endAngle : startAngle;
    const x2a = center + radius * Math.sin(rad(animatedEnd));
    const y2a = center - radius * Math.cos(rad(animatedEnd));
    const pathDataAnimated = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2a},${y2a} Z`;
    // Explode effect on hover
    const explode = hovered === i ? 8 : 0;
    const midAngle = rad((startAngle + endAngle) / 2);
    const dx = Math.sin(midAngle) * explode;
    const dy = -Math.cos(midAngle) * explode;
    return (
      <path
        key={d.label}
        d={pathDataAnimated}
        fill={GRADIENTS[i % GRADIENTS.length]}
        filter={hovered === i ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))' : 'drop-shadow(0 1px 4px rgba(0,0,0,0.10))'}
        transform={`translate(${dx},${dy})`}
        style={{ transition: 'all 0.5s cubic-bezier(.4,2,.6,1)' }}
        aria-label={getAriaLabel(d, percent)}
        tabIndex={0}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(i)}
        onBlur={() => setHovered(null)}
      />
    );
  });

  // Tooltips
  const tooltip = hovered !== null ? data[hovered] : null;
  const tooltipPercent = tooltip ? ((tooltip.value / total) * 100).toFixed(1) : null;

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox="0 0 160 160"
        className="w-full max-w-xs h-auto"
        width={240}
        height={240}
        role="img"
        aria-label="계약 상태 분포 차트"
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>
          <radialGradient id="grad2" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </radialGradient>
          <radialGradient id="grad3" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
          <radialGradient id="grad4" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#f59e42" />
          </radialGradient>
          <radialGradient id="grad5" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#14b8a6" />
          </radialGradient>
          <radialGradient id="grad6" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>
          <radialGradient id="grad7" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#a3a3a3" />
          </radialGradient>
          <radialGradient id="grad8" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ef4444" />
          </radialGradient>
        </defs>
        <g>{slices}</g>
        {/* Donut effect: hollow center */}
        <circle cx={center} cy={center} r={38} fill="#fff" />
      </svg>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-24 bg-white shadow-lg rounded px-4 py-2 text-sm text-gray-900 border z-20 pointer-events-none animate-fade-in"
          role="tooltip"
        >
          <div className="font-bold mb-1">{tooltip.label}</div>
          <div>{tooltip.value}건 ({tooltipPercent}%)</div>
        </div>
      )}
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2 min-w-[120px]">
            <span
              className="w-4 h-4 rounded-full inline-block border border-gray-200"
              style={{ background: COLORS[i % COLORS.length] }}
              aria-hidden="true"
            ></span>
            <span className="font-medium text-gray-800 text-sm">{d.label}</span>
            <span className="text-xs text-gray-500">{((d.value / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
} 