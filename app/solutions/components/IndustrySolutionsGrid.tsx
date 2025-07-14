'use client';

import { BriefcaseIcon, BuildingOffice2Icon, ChartBarIcon, HeartIcon, GlobeAltIcon, TruckIcon, FilmIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline';
import IndustryCard from './IndustryCard';

const INDUSTRIES = [
  {
    icon: <BriefcaseIcon className="w-8 h-8" />, // 제약·의료기기 회사
    name: '제약·의료기기 회사',
    summary: '신약 개발, 임상시험, 인허가 등 제약·의료기기 산업 특화 자문',
    description: '신약 개발, 임상시험, 인허가, 특허 등 복잡한 법률 이슈가 빈번한 산업으로, 오킴스는 국내외 제약사 및 의료기기 기업을 대상으로 맞춤형 자문을 제공합니다.',
    services: ['신약 라이선스 계약', '임상시험 계약 및 관리', '의료기기 인허가', '특허 및 지적재산권 보호', '규제 대응 및 컴플라이언스'],
    clients: '국내 대형 제약사, 글로벌 의료기기 기업 등',
    caseSummary: '국내 대형 제약사의 신약 라이선스 계약 체결 지원, 글로벌 의료기기 기업의 국내 인허가 및 특허 분쟁 자문',
    metrics: '20년 이상 업계 자문, 100건 이상의 프로젝트 수행',
  },
  {
    icon: <ChartBarIcon className="w-8 h-8" />, // 투자회사
    name: '투자회사',
    summary: '투자계약, M&A, 펀드 조성 등 투자업계 맞춤 법률 서비스 제공',
    description: '투자계약, M&A, 펀드 조성 등 투자업계 맞춤 법률 서비스 제공. 국내외 투자사 및 벤처캐피탈의 다양한 거래를 지원합니다.',
    services: ['투자계약서 작성', 'M&A 실사 및 계약', '펀드 설립 자문', '지분 구조 설계'],
    clients: '글로벌 투자회사, 국내 벤처캐피탈 등',
    caseSummary: '글로벌 투자회사의 국내 스타트업 투자계약 실사 및 계약 체결 지원',
    metrics: '수십 건의 투자 및 M&A 자문 경험',
  },
  {
    icon: <BuildingOffice2Icon className="w-8 h-8" />, // IT
    name: 'IT',
    summary: '개인정보보호, 소프트웨어 라이선스, IT 서비스 계약 등 IT기업 특화 자문',
    description: '개인정보보호, 소프트웨어 라이선스, IT 서비스 계약 등 IT기업 특화 자문. 빠르게 변화하는 IT 환경에 맞춘 실무 중심의 법률 지원.',
    services: ['개인정보보호 컴플라이언스', '소프트웨어 라이선스 계약', 'IT 서비스 이용약관', '데이터 보호 및 분쟁 대응'],
    clients: '국내외 IT 기업, 스타트업 등',
    caseSummary: '글로벌 IT 기업의 개인정보보호 체계 구축 및 실무 자문 제공',
    metrics: '100+ IT 기업 자문, 98% 고객 만족도',
  },
  {
    icon: <HeartIcon className="w-8 h-8" />, // 병원
    name: '병원',
    summary: '의료법, 환자정보보호, 의료기관 운영 관련 법률 자문',
    description: '의료법, 환자정보보호, 의료기관 운영 관련 법률 자문. 병원 설립부터 운영, 분쟁까지 전 과정 지원.',
    services: ['의료기관 설립/운영 자문', '환자정보보호 정책', '의료분쟁 대응', '의료계약서 작성'],
    clients: '대형 병원, 전문 클리닉 등',
    caseSummary: '대형 병원의 의료분쟁 예방 및 대응 자문',
    metrics: '20년 이상 의료기관 자문 경험',
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8" />, // 외국기업
    name: '외국기업',
    summary: '한국 진출, 현지화, 규제 대응 등 외국기업 대상 종합 법률 서비스',
    description: '한국 진출, 현지화, 규제 대응 등 외국기업 대상 종합 법률 서비스. 글로벌 기업의 한국 시장 진입을 전방위 지원.',
    services: ['현지 법인 설립', '규제 대응', '계약서 현지화', '지사 설립 및 운영'],
    clients: '글로벌 대기업, 외국계 스타트업 등',
    caseSummary: '글로벌 기업의 한국 진출 및 규제 대응 지원',
    metrics: '수십 건의 외국기업 진출 자문',
  },
  {
    icon: <TruckIcon className="w-8 h-8" />, // 운송·물류·조선
    name: '운송·물류·조선',
    summary: '운송, 물류, 조선 분야의 계약, 분쟁, 규제 등 특화 법률 자문',
    description: '운송, 물류, 조선 분야의 계약, 분쟁, 규제 등 특화 법률 자문 제공.',
    services: ['운송계약', '물류계약', '조선소 계약', '국제거래 자문'],
    clients: '국내외 운송/물류/조선 기업',
    caseSummary: '국내 조선소의 국제계약 및 분쟁 자문',
    metrics: '10년 이상 업계 자문',
  },
  {
    icon: <FilmIcon className="w-8 h-8" />, // 엔터테인먼트·MCN·스포츠
    name: '엔터테인먼트·MCN·스포츠',
    summary: '연예, 미디어, 스포츠 산업의 계약, 저작권, 분쟁 등 전문 자문',
    description: '연예, 미디어, 스포츠 산업의 계약, 저작권, 분쟁 등 전문 자문.',
    services: ['연예인/스포츠 선수 계약', '저작권 보호', '광고/방송 계약', '분쟁 대응'],
    clients: '연예기획사, MCN, 스포츠 구단 등',
    caseSummary: '국내 MCN 기업의 저작권 분쟁 자문',
    metrics: '수십 건의 엔터/스포츠 자문',
  },
  {
    icon: <AcademicCapIcon className="w-8 h-8" />, // 기관
    name: '기관',
    summary: '공공기관, 협회, 비영리단체 등 다양한 기관의 법률 자문 및 규제 대응',
    description: '공공기관, 협회, 비영리단체 등 다양한 기관의 법률 자문 및 규제 대응.',
    services: ['기관 설립/운영 자문', '규제 대응', '계약서 검토', '정관/규정 자문'],
    clients: '공공기관, 협회, 비영리단체 등',
    caseSummary: '공공기관의 규제 대응 및 계약 자문',
    metrics: '다수 기관 자문 경험',
  },
  {
    icon: <UsersIcon className="w-8 h-8" />, // 일반기업
    name: '일반기업',
    summary: '중소기업부터 대기업까지 다양한 기업의 일상적 법률 이슈 전반 지원',
    description: '중소기업부터 대기업까지 다양한 기업의 일상적 법률 이슈 전반 지원.',
    services: ['기업 설립/운영 자문', '노무/인사 자문', '계약서 작성/검토', '분쟁 대응'],
    clients: '국내외 일반기업',
    caseSummary: '국내 중견기업의 인사/노무 분쟁 자문',
    metrics: '수백 건의 기업 자문 경험',
  },
  {
    icon: <BriefcaseIcon className="w-8 h-8" />, // 바이오 벤처
    name: '바이오 벤처',
    summary: '바이오 스타트업 및 벤처기업의 투자, 특허, 인허가 등 성장 단계별 맞춤 자문',
    description: '바이오 스타트업 및 벤처기업의 투자, 특허, 인허가 등 성장 단계별 맞춤 자문.',
    services: ['투자계약', '특허 출원/관리', '인허가 자문', '기술이전 계약'],
    clients: '국내외 바이오 벤처',
    caseSummary: '바이오 벤처의 기술이전 및 투자계약 자문',
    metrics: '다수 바이오 벤처 자문 경험',
  },
  {
    icon: <BriefcaseIcon className="w-8 h-8" />, // 디지털헬스케어 벤처
    name: '디지털헬스케어 벤처',
    summary: '디지털헬스케어 스타트업의 데이터, 인허가, 투자 등 특화 자문',
    description: '디지털헬스케어 스타트업의 데이터, 인허가, 투자 등 특화 자문.',
    services: ['데이터 활용 자문', '디지털헬스케어 인허가', '투자계약', '서비스 약관'],
    clients: '국내외 디지털헬스케어 기업',
    caseSummary: '디지털헬스케어 기업의 데이터 활용 및 인허가 자문',
    metrics: '다수 디지털헬스케어 자문 경험',
  },
];

export default function IndustrySolutionsGrid() {
  return (
    <section className="bg-gray-50 py-16 px-2 md:px-6">
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">업계별 전문 솔루션</h2>
        <p className="text-gray-600 text-lg">오킴스의 실전 경험과 업계별 맞춤 자문을 한눈에 확인하세요.</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {INDUSTRIES.map((industry, idx) => (
          <IndustryCard key={idx} icon={industry.icon} name={industry.name} summary={industry.summary} details={industry} />
        ))}
      </div>
    </section>
  );
} 