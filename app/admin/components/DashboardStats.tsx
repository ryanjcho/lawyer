"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaFileContract, FaMoneyBillWave, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// Enhanced mock data generation
const generateMockStats = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  
  return {
    totalUsers: 156,
    activeUsers: 142,
    totalContracts: 234,
    contractsThisMonth: 45,
    revenue: 23450000,
    revenueThisMonth: 5600000,
    averageProcessingTime: 2.3,
    customerSatisfaction: 4.8,
    urgentContracts: 12,
    overdueContracts: 3,
    completedThisMonth: 38,
    failedContracts: 2
  };
};

const generateMockChartData = (type) => {
  const data: Array<{ date: string; value: number; formattedDate: string }> = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    let value;
    switch (type) {
      case 'contracts':
        value = Math.floor(Math.random() * 8) + 2;
        break;
      case 'revenue':
        value = Math.floor(Math.random() * 2000000) + 500000;
        break;
      case 'users':
        value = Math.floor(Math.random() * 5) + 1;
        break;
      default:
        value = Math.floor(Math.random() * 100);
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      formattedDate: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    });
  }
  
  return data;
};

const generateMockPieData = () => {
  return [
    { name: 'AI 검토 대기', value: 15, color: '#FCD34D' },
    { name: 'AI 검토 완료', value: 25, color: '#3B82F6' },
    { name: '변호사 검토 중', value: 35, color: '#6366F1' },
    { name: '완료', value: 20, color: '#10B981' },
    { name: '추가 정보 필요', value: 5, color: '#EF4444' }
  ];
};

export default function DashboardStats() {
  const mockStats = generateMockStats();
  const mockContractData = generateMockChartData('contracts');
  const mockRevenueData = generateMockChartData('revenue');
  const mockPieData = generateMockPieData();

  const [stats, setStats] = useState(mockStats);
  const [contractData] = useState(mockContractData);
  const [revenueData] = useState(mockRevenueData);
  const [pieData] = useState(mockPieData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update some stats randomly
      setStats(prev => ({
        ...prev,
        urgentContracts: Math.max(0, prev.urgentContracts + (Math.random() > 0.5 ? 1 : -1)),
        activeUsers: Math.max(0, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const getTrendColor = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const getTrendIcon = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? '↗' : change < 0 ? '↘' : '→';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 사용자</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${getTrendColor(stats.activeUsers, stats.totalUsers * 0.8)}`}>
                  {getTrendIcon(stats.activeUsers, stats.totalUsers * 0.8)} {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% 활성
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 계약</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContracts.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">
                  ↗ +{stats.contractsThisMonth} 이번 달
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaFileContract className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 매출</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">
                  ↗ +{formatCurrency(stats.revenueThisMonth)} 이번 달
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaMoneyBillWave className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">평균 처리 시간</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageProcessingTime}일</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600">
                  ↘ -15% vs 지난달
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaClock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">긴급 계약</p>
              <p className="text-2xl font-bold text-red-600">{stats.urgentContracts}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">연체 계약</p>
              <p className="text-2xl font-bold text-orange-600">{stats.overdueContracts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaClock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">이번 달 완료</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">고객 만족도</p>
              <p className="text-2xl font-bold text-blue-600">{stats.customerSatisfaction}/5.0</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-blue-600 font-bold">★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Volume Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">계약 볼륨 트렌드</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={contractData}>
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [value, '계약 수']}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3182ce" 
                strokeWidth={2}
                dot={{ fill: '#3182ce', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3182ce', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">수익 트렌드</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), '수익']}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contract Status Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">계약 상태 분포</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `상태: ${label}`}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col justify-center space-y-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.value}개</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 