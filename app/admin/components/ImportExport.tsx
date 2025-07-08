"use client";
import { useState, useRef } from 'react';
import { 
  FaDownload, FaUpload, FaFileCsv, FaFileExcel, FaFilePdf, 
  FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle, 
  FaSpinner, FaEye, FaTrash, FaCog 
} from 'react-icons/fa';

// Mock data for export
const generateExportData = (type: string) => {
  const data: any[] = [];
  const count = Math.floor(Math.random() * 100) + 50;
  
  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'contracts':
        data.push({
          id: `C-2024-${String(i + 1).padStart(3, '0')}`,
          name: `Contract ${i + 1}`,
          client: `Client ${i + 1}`,
          status: ['awaiting_ai', 'ai_complete', 'lawyer_review', 'complete'][Math.floor(Math.random() * 4)],
          type: ['review', 'draft'][Math.floor(Math.random() * 2)],
          lawyer: `Lawyer ${Math.floor(Math.random() * 10) + 1}`,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          value: Math.floor(Math.random() * 10000000) + 1000000,
          riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)]
        });
        break;
      case 'users':
        data.push({
          id: `U-${String(i + 1).padStart(3, '0')}`,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          company: `Company ${i + 1}`,
          role: ['USER', 'ADMIN', 'LAWYER'][Math.floor(Math.random() * 3)],
          status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)],
          lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          contractsAnalyzed: Math.floor(Math.random() * 50)
        });
        break;
      case 'analytics':
        data.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          contracts: Math.floor(Math.random() * 10) + 1,
          revenue: Math.floor(Math.random() * 2000000) + 500000,
          users: Math.floor(Math.random() * 5) + 1,
          aiReviews: Math.floor(Math.random() * 8) + 1,
          lawyerReviews: Math.floor(Math.random() * 6) + 1
        });
        break;
    }
  }
  
  return data;
};

const exportTemplates = {
  contracts: {
    name: '계약 데이터',
    fields: ['id', 'name', 'client', 'status', 'type', 'lawyer', 'createdAt', 'value', 'riskLevel'],
    fieldLabels: ['ID', '계약명', '고객사', '상태', '타입', '담당변호사', '생성일', '계약금액', '위험도']
  },
  users: {
    name: '사용자 데이터',
    fields: ['id', 'name', 'email', 'company', 'role', 'status', 'lastLogin', 'contractsAnalyzed'],
    fieldLabels: ['ID', '이름', '이메일', '회사', '역할', '상태', '최근로그인', '분석계약수']
  },
  analytics: {
    name: '분석 데이터',
    fields: ['date', 'contracts', 'revenue', 'users', 'aiReviews', 'lawyerReviews'],
    fieldLabels: ['날짜', '계약수', '수익', '사용자수', 'AI검토수', '변호사검토수']
  }
};

const exportFormats = {
  csv: { label: 'CSV', icon: <FaFileCsv />, color: 'text-green-600' },
  excel: { label: 'Excel', icon: <FaFileExcel />, color: 'text-green-700' },
  pdf: { label: 'PDF', icon: <FaFilePdf />, color: 'text-red-600' }
};

export default function ImportExport() {
  const [selectedTemplate, setSelectedTemplate] = useState('contracts');
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState(new Set(['id', 'name', 'client', 'status']));
  const [dateRange, setDateRange] = useState('30');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportHistory, setExportHistory] = useState<Array<{ id: number; template: string; format: string; recordCount: number; timestamp: string; fileName: string }>>([]);
  
  // Import state
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<{ headers: string[]; data: any[] } | null>(null);
  const [importValidation, setImportValidation] = useState<{ errors: string[]; warnings: string[] }>({ errors: [], warnings: [] });
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importHistory, setImportHistory] = useState<Array<{ id: number; fileName: string; recordCount: number; timestamp: string; status: string }>>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contractsExportData = generateExportData('contracts');
  const usersExportData = generateExportData('users');
  const analyticsExportData = generateExportData('analytics');

  // Export functions
  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setExportProgress(i);
    }
    
    const data = (() => {
      switch (selectedTemplate) {
        case 'contracts':
          return contractsExportData;
        case 'users':
          return usersExportData;
        case 'analytics':
          return analyticsExportData;
        default:
          return [];
      }
    })();
    const template = exportTemplates[selectedTemplate];
    const filteredData = data.map(item => {
      const filtered = {};
      selectedFields.forEach(field => {
        if (item[field] !== undefined) {
          filtered[template.fieldLabels[template.fields.indexOf(field)]] = item[field];
        }
      });
      return filtered;
    });
    
    // Generate file based on format
    let fileName = `${selectedTemplate}_export_${new Date().toISOString().split('T')[0]}`;
    let content, mimeType;
    
    switch (selectedFormat) {
      case 'csv':
        const csvContent = [
          Object.keys(filteredData[0]).join(','),
          ...filteredData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
        ].join('\n');
        content = csvContent;
        mimeType = 'text/csv;charset=utf-8;';
        fileName += '.csv';
        break;
        
      case 'excel':
        // In a real app, you'd use a library like xlsx
        content = 'Excel export would be implemented here';
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileName += '.xlsx';
        break;
        
      case 'pdf':
        // In a real app, you'd use a library like jsPDF
        content = 'PDF export would be implemented here';
        mimeType = 'application/pdf';
        fileName += '.pdf';
        break;
    }
    
    // Download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Add to history
    const exportRecord = {
      id: Date.now(),
      template: template.name,
      format: exportFormats[selectedFormat].label,
      recordCount: filteredData.length,
      timestamp: new Date().toISOString(),
      fileName
    };
    setExportHistory(prev => [exportRecord, ...prev.slice(0, 9)]);
    
    setIsExporting(false);
    setExportProgress(0);
  };

  // Import functions
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setImportFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (!e.target) throw new Error('파일을 읽는 중 오류가 발생했습니다.');
        const text = e.target.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });
        
        setImportData({ headers, data });
        validateImportData({ headers, data });
      } catch (error) {
        console.error('Error parsing file:', error);
        setImportValidation({
          errors: ['파일을 읽는 중 오류가 발생했습니다.'],
          warnings: []
        });
      }
    };
    reader.readAsText(file);
  };

  const validateImportData = (data: { headers: string[]; data: any[] }) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (data.data.length === 0) {
      errors.push('데이터가 없습니다.');
    }
    
    if (data.data.length > 1000) {
      warnings.push('1000개 이상의 레코드가 있습니다. 처리 시간이 오래 걸릴 수 있습니다.');
    }
    
    // Check for required fields based on template
    const requiredFields = {
      contracts: ['ID', '계약명', '고객사'],
      users: ['ID', '이름', '이메일'],
      analytics: ['날짜', '계약수']
    };
    
    const template = selectedTemplate;
    const missingFields = requiredFields[template]?.filter(field => 
      !data.headers.includes(field)
    ) || [];
    
    if (missingFields.length > 0) {
      errors.push(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
    }
    
    // Check for duplicate IDs
    const ids = data.data.map(row => row.ID || row.id).filter(Boolean);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      warnings.push('중복된 ID가 발견되었습니다.');
    }
    
    setImportValidation({ errors, warnings });
  };

  const handleImport = async () => {
    if (!importData || importValidation.errors.length > 0) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import process
    const totalRecords = importData.data.length;
    for (let i = 0; i <= totalRecords; i += Math.ceil(totalRecords / 10)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setImportProgress((i / totalRecords) * 100);
    }
    
    // Add to history
    const importRecord = {
      id: Date.now(),
      fileName: importFile ? importFile.name : 'unknown.csv',
      recordCount: importData.data.length,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    setImportHistory(prev => [importRecord, ...prev.slice(0, 9)]);
    
    setIsImporting(false);
    setImportProgress(0);
    setImportFile(null);
    setImportData(null);
    setImportValidation({ errors: [], warnings: [] });
  };

  const downloadTemplate = () => {
    const template = exportTemplates[selectedTemplate];
    const templateData = [
      template.fieldLabels.join(','),
      template.fieldLabels.map(() => '예시 데이터').join(',')
    ].join('\n');
    
    const blob = new Blob([templateData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedTemplate}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <FaDownload className="text-blue-600" />
          <span>데이터 내보내기</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Export Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">템플릿 선택</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {Object.entries(exportTemplates).map(([key, template]) => (
                  <option key={key} value={key}>{template.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">포맷 선택</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(exportFormats).map(([key, format]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedFormat(key)}
                    className={`p-3 border rounded-lg flex flex-col items-center space-y-1 transition-colors ${
                      selectedFormat === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className={format.color}>{format.icon}</span>
                    <span className="text-xs font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">필드 선택</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {exportTemplates[selectedTemplate].fields.map((field, index) => (
                  <label key={field} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.has(field)}
                      onChange={(e) => {
                        const newSet = new Set(selectedFields);
                        if (e.target.checked) {
                          newSet.add(field);
                        } else {
                          newSet.delete(field);
                        }
                        setSelectedFields(newSet);
                      }}
                      className="rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm">{exportTemplates[selectedTemplate].fieldLabels[index]}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기간 선택</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7">최근 7일</option>
                <option value="30">최근 30일</option>
                <option value="90">최근 90일</option>
                <option value="365">최근 1년</option>
                <option value="all">전체</option>
              </select>
            </div>
          </div>
          
          {/* Export Actions */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">내보내기 옵션</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• 템플릿: {exportTemplates[selectedTemplate].name}</div>
                <div>• 포맷: {exportFormats[selectedFormat].label}</div>
                <div>• 선택된 필드: {selectedFields.size}개</div>
                <div>• 기간: {dateRange === 'all' ? '전체' : `최근 ${dateRange}일`}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={downloadTemplate}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                템플릿 다운로드
              </button>
              
              <button
                onClick={handleExport}
                disabled={isExporting || selectedFields.size === 0}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>내보내는 중... {exportProgress}%</span>
                  </>
                ) : (
                  <>
                    <FaDownload />
                    <span>내보내기</span>
                  </>
                )}
              </button>
            </div>
            
            {isExporting && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <FaUpload className="text-green-600" />
          <span>데이터 가져오기</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Import Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">파일 선택</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors text-center"
              >
                <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-600">
                  {importFile ? importFile.name : '파일을 선택하거나 여기에 드래그하세요'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  CSV, Excel 파일 지원
                </div>
              </button>
            </div>
            
            {importData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">파일 정보</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• 레코드 수: {importData.data.length}개</div>
                  <div>• 필드 수: {importData.headers.length}개</div>
                  <div>• 필드: {importData.headers.join(', ')}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Import Validation and Actions */}
          <div className="space-y-4">
            {importValidation.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2 flex items-center space-x-2">
                  <FaTimes className="text-red-600" />
                  <span>오류</span>
                </h3>
                <ul className="space-y-1 text-sm text-red-700">
                  {importValidation.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {importValidation.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2 flex items-center space-x-2">
                  <FaExclamationTriangle className="text-yellow-600" />
                  <span>경고</span>
                </h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  {importValidation.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {importData && importValidation.errors.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2 flex items-center space-x-2">
                  <FaCheck className="text-green-600" />
                  <span>검증 완료</span>
                </h3>
                <p className="text-sm text-green-700">
                  파일이 성공적으로 검증되었습니다. 가져오기를 진행할 수 있습니다.
                </p>
              </div>
            )}
            
            <button
              onClick={handleImport}
              disabled={!importData || importValidation.errors.length > 0 || isImporting}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isImporting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>가져오는 중... {Math.round(importProgress)}%</span>
                </>
              ) : (
                <>
                  <FaUpload />
                  <span>가져오기</span>
                </>
              )}
            </button>
            
            {isImporting && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">내보내기 기록</h3>
          <div className="space-y-3">
            {exportHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">내보내기 기록이 없습니다.</p>
            ) : (
              exportHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{record.template}</div>
                    <div className="text-xs text-gray-600">
                      {record.format} • {record.recordCount}개 레코드
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.timestamp).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Import History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">가져오기 기록</h3>
          <div className="space-y-3">
            {importHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">가져오기 기록이 없습니다.</p>
            ) : (
              importHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{record.fileName}</div>
                    <div className="text-xs text-gray-600">
                      {record.recordCount}개 레코드 • {record.status}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.timestamp).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 