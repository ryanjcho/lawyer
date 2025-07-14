"use client";
import { useState, useEffect, useRef } from 'react';

interface SearchFilter {
  type: 'contract' | 'client' | 'lawyer' | 'status' | 'date';
  value: string;
  label: string;
}

interface SearchPreset {
  id: string;
  name: string;
  filters: SearchFilter[];
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample data for autocomplete
  const contractSuggestions = [
    'C-2024-001', 'C-2024-002', 'C-2024-003', 'C-2024-004', 'C-2024-005'
  ];
  const clientSuggestions = [
    '삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '포스코'
  ];
  const lawyerSuggestions = [
    '김변호사', '이변호사', '박변호사', '최변호사', '정변호사'
  ];

  // Saved search presets
  const searchPresets: SearchPreset[] = [
    {
      id: 'urgent',
      name: '긴급 계약',
      filters: [
        { type: 'status', value: 'urgent', label: '긴급' }
      ]
    },
    {
      id: 'overdue',
      name: '연체 계약',
      filters: [
        { type: 'status', value: 'overdue', label: '연체' }
      ]
    },
    {
      id: 'kim-lawyer',
      name: '김변호사 담당',
      filters: [
        { type: 'lawyer', value: '김변호사', label: '김변호사' }
      ]
    },
    {
      id: 'this-month',
      name: '이번 달',
      filters: [
        { type: 'date', value: 'this-month', label: '이번 달' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 0) {
      const allSuggestions = [
        ...contractSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())),
        ...clientSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())),
        ...lawyerSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()))
      ];
      setSuggestions(allSuggestions.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addFilter = (type: SearchFilter['type'], value: string, label: string) => {
    const newFilter: SearchFilter = { type, value, label };
    setActiveFilters(prev => [...prev, newFilter]);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const removeFilter = (index: number) => {
    setActiveFilters(prev => prev.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: SearchPreset) => {
    setActiveFilters(preset.filters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with:', { query: searchQuery, filters: activeFilters });
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Main Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="계약, 고객, 변호사 검색..."
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            onFocus={() => setShowSuggestions(true)}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          검색
        </button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {filter.label}
              <button
                onClick={() => removeFilter(index)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            모두 지우기
          </button>
        </div>
      )}

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  if (contractSuggestions.includes(suggestion)) {
                    addFilter('contract', suggestion, `계약: ${suggestion}`);
                  } else if (clientSuggestions.includes(suggestion)) {
                    addFilter('client', suggestion, `고객: ${suggestion}`);
                  } else if (lawyerSuggestions.includes(suggestion)) {
                    addFilter('lawyer', suggestion, `변호사: ${suggestion}`);
                  }
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {isExpanded && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            {/* Saved Presets */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">저장된 검색</h4>
              <div className="flex flex-wrap gap-2">
                {searchPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">빠른 필터</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addFilter('status', 'urgent', '긴급')}
                  className="px-3 py-2 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  긴급 계약
                </button>
                <button
                  onClick={() => addFilter('status', 'overdue', '연체')}
                  className="px-3 py-2 text-xs bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
                >
                  연체 계약
                </button>
                <button
                  onClick={() => addFilter('status', 'pending', '검토 대기')}
                  className="px-3 py-2 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                >
                  검토 대기
                </button>
                <button
                  onClick={() => addFilter('status', 'completed', '완료')}
                  className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  완료된 계약
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">날짜 범위</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addFilter('date', 'today', '오늘')}
                  className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  오늘
                </button>
                <button
                  onClick={() => addFilter('date', 'this-week', '이번 주')}
                  className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  이번 주
                </button>
                <button
                  onClick={() => addFilter('date', 'this-month', '이번 달')}
                  className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  이번 달
                </button>
                <button
                  onClick={() => addFilter('date', 'last-month', '지난 달')}
                  className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  지난 달
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 