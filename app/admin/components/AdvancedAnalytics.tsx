"use client";
import { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend, ComposedChart,
  ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  FaDownload, FaFilter, FaCalendarAlt, FaChartLine, FaChartBar, 
  FaChartPie, FaTable, FaFileExport, FaEye, FaEyeSlash 
} from 'react-icons/fa';
import seedrandom from 'seedrandom';
const rng = seedrandom('advanced-analytics-seed');

const fixedBaseDate = new Date('2024-07-07T09:00:00+09:00');

// Enhanced mock data with more granular information
const generateAdvancedMockData = () => {
  const now = fixedBaseDate;
  const data: any[] = [];
  
  // Generate 90 days of data
  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isMonthEnd = date.getDate() >= 25;
    
    // Base values with realistic variations
    const baseContracts = isWeekend ? 2 : Math.floor(rng() * 8) + 3;
    const baseRevenue = isWeekend ? 500000 : Math.floor(rng() * 2000000) + 800000;
    const baseUsers = isWeekend ? 1 : Math.floor(rng() * 4) + 2;
    
    // Add trends and patterns
    const trendMultiplier = 1 + (Math.sin(i / 7) * 0.3) + (Math.sin(i / 30) * 0.2);
    const seasonalMultiplier = 1 + (Math.sin((date.getMonth() * 2 * Math.PI) / 12) * 0.1);
    
    data.push({
      date: date.toISOString().split('T')[0],
      formattedDate: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', timeZone: 'Asia/Seoul' }),
      contracts: Math.floor(baseContracts * trendMultiplier * seasonalMultiplier),
      revenue: Math.floor(baseRevenue * trendMultiplier * seasonalMultiplier),
      users: Math.floor(baseUsers * trendMultiplier * seasonalMultiplier),
      aiReviews: Math.floor(baseContracts * 0.8 * trendMultiplier),
      lawyerReviews: Math.floor(baseContracts * 0.6 * trendMultiplier),
      urgentContracts: Math.floor(baseContracts * 0.15),
      highRiskContracts: Math.floor(baseContracts * 0.25),
      averageProcessingTime: 2.3 + (rng() - 0.5) * 0.8,
      customerSatisfaction: 4.5 + (rng() - 0.5) * 0.6,
      dayOfWeek: date.getDay(),
      month: date.getMonth(),
      quarter: Math.floor(date.getMonth() / 3) + 1,
      isWeekend,
      isMonthEnd
    });
  }
  
  return data;
};

const generateDrillDownData = (type: string, filter: any) => {
  const data: any[] = [];
  const categories: { [key: string]: string[] } = {
    'contracts': ['NDA', 'MSA', 'SLA', 'Employment', 'IP Agreement', 'Consulting', 'Vendor'],
    'revenue': ['Basic Review', 'Premium Review', 'Drafting', 'Consultation', 'Rush Service'],
    'users': ['New Users', 'Active Users', 'Returning Users', 'Premium Users', 'Inactive Users'],
    'performance': ['AI Processing', 'Lawyer Review', 'Client Feedback', 'System Uptime', 'Response Time']
  };
  
  categories[type]?.forEach((category, index) => {
    data.push({
      category,
      value: Math.floor(rng() * 100) + 20,
      percentage: Math.floor(rng() * 30) + 10,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change: Math.floor(rng() * 15) + 1
    });
  });
  
  return data;
};

const chartTypes = {
  line: { label: '라인 차트', icon: <FaChartLine /> },
  bar: { label: '막대 차트', icon: <FaChartBar /> },
  area: { label: '영역 차트', icon: <FaChartLine /> },
  pie: { label: '파이 차트', icon: <FaChartPie /> },
  scatter: { label: '산점도', icon: <FaChartLine /> },
  radar: { label: '레이더 차트', icon: <FaChartLine /> }
};

const metrics: { [key: string]: { label: string; color: string } } = {
  contracts: { label: '계약 수', color: '#3B82F6' },
  revenue: { label: '수익', color: '#10B981' },
  users: { label: '사용자', color: '#F59E0B' },
  aiReviews: { label: 'AI 검토', color: '#8B5CF6' },
  lawyerReviews: { label: '변호사 검토', color: '#EF4444' },
  urgentContracts: { label: '긴급 계약', color: '#DC2626' },
  highRiskContracts: { label: '고위험 계약', color: '#EA580C' },
  averageProcessingTime: { label: '평균 처리 시간', color: '#059669' },
  customerSatisfaction: { label: '고객 만족도', color: '#7C3AED' }
};

const mockRawData = generateAdvancedMockData();

export default function AdvancedAnalytics() {
  const [rawData] = useState(mockRawData);
  const [dateRange, setDateRange] = useState('30'); // days
  const [selectedMetric, setSelectedMetric] = useState('contracts');
  const [chartType, setChartType] = useState('line');
  const [drillDownType, setDrillDownType] = useState(null);
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [filters, setFilters] = useState({
    excludeWeekends: false,
    excludeMonthEnd: false,
    minValue: '',
    maxValue: ''
  });
  const [visibleMetrics, setVisibleMetrics] = useState(new Set(['contracts', 'revenue']));

  // Filter and process data based on selections
  const processedData = useMemo(() => {
    let filtered = rawData;
    
    // Apply date range filter
    const daysToShow = parseInt(dateRange);
    filtered = filtered.slice(-daysToShow);
    
    // Apply custom filters
    if (filters.excludeWeekends) {
      filtered = filtered.filter(d => !d.isWeekend);
    }
    if (filters.excludeMonthEnd) {
      filtered = filtered.filter(d => !d.isMonthEnd);
    }
    if (filters.minValue) {
      filtered = filtered.filter(d => d[selectedMetric] >= parseFloat(filters.minValue));
    }
    if (filters.maxValue) {
      filtered = filtered.filter(d => d[selectedMetric] <= parseFloat(filters.maxValue));
    }
    
    return filtered;
  }, [rawData, dateRange, filters, selectedMetric]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (processedData.length === 0) return {
      total: 0,
      average: 0,
      maximum: 0,
      minimum: 0,
      median: 0,
      trend: 0,
      count: 0
    };
    
    const values = processedData.map(d => d[selectedMetric]);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const sorted = values.sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    
    // Calculate trend
    const recent = values.slice(-7);
    const previous = values.slice(-14, -7);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
    const trend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;
    
    return {
      total: sum,
      average: avg,
      maximum: max,
      minimum: min,
      median,
      trend,
      count: processedData.length
    };
  }, [processedData, selectedMetric]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatValue = (value) => {
    if (selectedMetric === 'revenue') return formatCurrency(value);
    if (selectedMetric === 'averageProcessingTime') return `${value.toFixed(1)}일`;
    if (selectedMetric === 'customerSatisfaction') return `${value.toFixed(1)}/5.0`;
    return value.toLocaleString();
  };

  const handleDrillDown = (type) => {
    setDrillDownType(type);
    setShowDrillDown(true);
  };

  const exportData = (format) => {
    const dataToExport = processedData.map(d => ({
      날짜: d.formattedDate,
      [metrics[selectedMetric].label]: d[selectedMetric]
    }));
    
    if (format === 'csv') {
      const csvContent = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_${selectedMetric}_${dateRange}days.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderChart = () => {
    const commonProps = {
      data: processedData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [formatValue(value), metrics[selectedMetric].label]}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={metrics[selectedMetric].color}
              strokeWidth={2}
              dot={{ fill: metrics[selectedMetric].color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: metrics[selectedMetric].color, strokeWidth: 2 }}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [formatValue(value), metrics[selectedMetric].label]}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Bar 
              dataKey={selectedMetric} 
              fill={metrics[selectedMetric].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [formatValue(value), metrics[selectedMetric].label]}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={metrics[selectedMetric].color}
              fill={metrics[selectedMetric].color}
              fillOpacity={0.6}
            />
          </AreaChart>
        );
      
      default:
        return <div>차트 타입을 선택하세요</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" />
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7">최근 7일</option>
              <option value="30">최근 30일</option>
              <option value="90">최근 90일</option>
              <option value="365">최근 1년</option>
            </select>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-gray-400" />
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              {Object.entries(metrics).map(([key, metric]) => (
                <option key={key} value={key}>{metric.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {metrics[selectedMetric].label} 분석 ({dateRange}일)
          </h3>
          <button
            onClick={() => handleDrillDown(selectedMetric)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            상세 분석
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Drill Down Modal */}
      {showDrillDown && drillDownType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {metrics[drillDownType].label} 상세 분석
              </h3>
              <button
                onClick={() => setShowDrillDown(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">카테고리별 분포</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={generateDrillDownData(drillDownType, filters)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {generateDrillDownData(drillDownType, filters).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">카테고리별 상세</h4>
                <div className="space-y-3">
                  {generateDrillDownData(drillDownType, filters).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-gray-600">{item.value} ({item.percentage}%)</div>
                      </div>
                      <div className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? '+' : '-'}{item.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 