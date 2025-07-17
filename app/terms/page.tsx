'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden flex items-center justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">이용약관</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">로킷 서비스 이용에 관한 약관입니다<br/><span className='font-semibold'>마지막 업데이트: 2024년 7월 1일</span></p>
          </motion.div>
        </div>
      </section>
      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* --- BEGIN NEW DETAILED TERMS CONTENT --- */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-600 leading-relaxed">이 약관은 로킷(이하 "회사")이 제공하는 AI 기반 계약 리스크 관리 서비스(이하 "서비스")의 이용조건, 절차, 권리·의무 및 책임사항 등 기본적인 사항을 규정함을 목적으로 합니다.</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (정의)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>"서비스": 회사가 제공하는 AI 기반 계약 리스크 분석 및 관리 서비스</li>
                <li>"이용자": 본 약관에 동의하고 서비스를 이용하는 자(회원/비회원 포함)</li>
                <li>"회원": 회사와 서비스 이용계약을 체결한 자</li>
                <li>"계약서": 이용자가 업로드하여 분석을 요청하는 문서</li>
                <li>"분석 결과": AI 및 변호사가 제공하는 리스크 평가 및 개선 제안</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (약관의 명시, 효력 및 변경)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>본 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력을 발생</li>
                <li>회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 최소 7일 전 공지(중대한 변경은 30일 전)</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (이용계약의 체결)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회원가입(약관 동의, 정보 입력)으로 이용계약 성립</li>
                <li>회사는 다음의 경우 가입을 거부/취소할 수 있음: 실명 미사용, 허위정보, 중복가입, 기타 부적격</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (서비스의 제공 및 변경)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-disc pl-6 space-y-1">
                    <li>계약서 업로드 및 AI 1차 분석</li>
                    <li>변호사 2차 검증 및 심층 분석</li>
                    <li>리스크 평가 및 개선 제안</li>
                    <li>계약 모니터링 및 관리</li>
                  </ul>
                </li>
                <li>서비스 내용은 회사 정책에 따라 변경될 수 있으며, 변경 시 사전 공지</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (서비스 이용의 제한 및 중지)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회사는 다음의 경우 서비스 제공을 일시 중지/제한할 수 있음:
                  <ul className="list-disc pl-6 space-y-1">
                    <li>설비 점검, 보수, 교체, 장애</li>
                    <li>천재지변, 불가항력</li>
                    <li>법령 위반, 약관 위반, 부정 이용</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (이용자의 의무)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>관련 법령, 약관, 서비스 이용 안내 준수</li>
                <li>타인 정보 도용, 불법행위, 서비스 방해, 무단 복제/유통 금지</li>
                <li>업로드하는 계약서에 대한 적법한 권리 보유</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (요금 및 결제)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>서비스 요금은 회사가 정한 요금표에 따름</li>
                <li>이용자는 회사가 정한 방법으로 요금 납부</li>
                <li>미납 시 서비스 제한/해지 가능</li>
                <li>환불 정책은 별도 고지</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (개인정보보호)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회사는 개인정보처리방침을 수립·공개하며, 관련 법령 및 방침 준수</li>
                <li>개인정보 수집, 이용, 제공 등은 개인정보처리방침에 따름</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (지적재산권)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>서비스 및 콘텐츠에 대한 저작권 등 권리는 회사에 귀속</li>
                <li>이용자는 회사의 사전 동의 없이 서비스 내 정보/콘텐츠를 복제, 유통, 상업적 이용 불가</li>
                <li>이용자가 업로드한 계약서 등은 이용자에게 권리 귀속</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제11조 (분석 결과의 성질 및 면책)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회사가 제공하는 분석 결과는 참고용 자료이며, 법적 효력이나 책임을 보장하지 않음</li>
                <li>중요한 법적 판단 전 반드시 변호사와 상담 필요</li>
                <li>회사는 불가항력, 이용자 귀책, 기대수익 미달, 정보 신뢰성 등에 대해 책임지지 않음</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제12조 (계약 해지 및 이용제한)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>이용자는 언제든지 회원 탈퇴 가능</li>
                <li>회사는 약관 위반, 법령 위반, 부정 이용 시 사전 통지 후 계약 해지/이용 제한 가능</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제13조 (분쟁해결 및 관할법원)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회사는 이용자의 정당한 의견/불만을 반영하기 위해 피해보상처리기구 운영</li>
                <li>전자상거래 분쟁은 소비자분쟁조정위원회 조정에 따를 수 있음</li>
                <li>분쟁 발생 시 회사 본사 소재지 관할법원, 대한민국법 준거</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제14조 (부칙)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>본 약관은 2024년 7월 1일부터 시행</li>
                <li>이전 약관은 본 약관으로 대체</li>
              </ul>
            </div>
            {/* --- END NEW DETAILED TERMS CONTENT --- */}
          </div>
          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              약관에 대한 문의사항이 있으신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              이용약관에 대한 궁금한 점이나 추가 설명이 필요하시면<br/>
              언제든지 문의해 주세요.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 