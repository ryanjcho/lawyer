'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">개인정보처리방침</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">로킷의 개인정보 수집 및 이용에 관한 안내입니다<br/><span className='font-semibold'>마지막 업데이트: 2024년 7월 1일</span></p>
          </motion.div>
        </div>
      </section>
      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* --- BEGIN NEW DETAILED POLICY CONTENT --- */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 개인정보의 수집 항목 및 방법</h2>
              <p className="text-gray-600 leading-relaxed mb-4">로킷(이하 "회사")은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><b>필수 정보</b>: 이름, 이메일, 비밀번호, 회사명/직책(기업 고객), 서비스 이용기록, 결제정보(카드정보는 PG사에서 직접 관리)</li>
                <li><b>선택 정보</b>: 전화번호, 주소, 마케팅 수신 동의 여부, 서비스 이용 통계 및 분석 데이터</li>
                <li><b>자동 수집 정보</b>: IP 주소, 쿠키, 접속 로그, 기기 정보, 브라우저 정보</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">수집 방법: 회원가입, 서비스 이용, 고객센터 문의, 이벤트/프로모션 참여, 자동 수집(웹/앱 이용 시)</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 개인정보의 이용 목적</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회원 관리(가입, 본인확인, 문의응대)</li>
                <li>계약서 분석 및 리스크 평가</li>
                <li>서비스 제공 및 개선, 신규 서비스 개발</li>
                <li>결제 및 환불 처리</li>
                <li>마케팅 및 광고(동의 시)</li>
                <li>법적 의무 이행 및 분쟁 대응</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>회원 탈퇴 시 또는 수집·이용 목적 달성 시 지체 없이 파기</li>
                <li>단, 관련 법령에 따라 보존 필요 시 아래와 같이 보관</li>
                <li>계약/청약철회 기록: 5년</li>
                <li>대금결제/재화공급 기록: 5년</li>
                <li>소비자 불만/분쟁처리 기록: 3년</li>
                <li>웹사이트 방문기록: 3개월</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-600 leading-relaxed mb-4">회사는 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 아래의 경우 예외로 합니다.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령에 의거하거나 수사기관의 요청이 있는 경우</li>
                <li>이용자 또는 제3자의 급박한 생명·신체·재산 보호가 필요한 경우</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 개인정보 처리의 위탁</h2>
              <p className="text-gray-600 leading-relaxed mb-4">회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 외부에 위탁할 수 있습니다.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">위탁업무</th>
                      <th className="text-left py-2">수탁업체</th>
                      <th className="text-left py-2">위탁기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">클라우드 서버 운영</td>
                      <td className="py-2">AWS, Google Cloud</td>
                      <td className="py-2">서비스 제공 기간</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">결제 처리</td>
                      <td className="py-2">토스페이먼츠, 아임포트</td>
                      <td className="py-2">결제 완료 시까지</td>
                    </tr>
                    <tr>
                      <td className="py-2">고객 지원</td>
                      <td className="py-2">Zendesk, Intercom</td>
                      <td className="py-2">서비스 제공 기간</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">※ 위탁계약 시 개인정보 보호 관련 법령 준수, 기술적·관리적 보호조치, 재위탁 제한, 책임 명확화 등 필요한 사항을 규정합니다.</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 이용자의 권리 및 행사 방법</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>개인정보 열람, 정정, 삭제, 처리정지 요구 가능</li>
                <li>동의 철회 및 회원 탈퇴 가능</li>
                <li>권리 행사는 서면, 이메일, 고객센터 등으로 가능하며, 회사는 지체 없이 조치</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 개인정보의 파기 절차 및 방법</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><b>파기 절차</b>: 목적 달성, 보유기간 경과 시 개인정보 보호책임자 승인 후 파기</li>
                <li><b>파기 방법</b>: 전자적 파일은 복구 불가한 기술적 방법(디가우징 등), 종이 문서는 분쇄 또는 소각</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 개인정보의 안전성 확보 조치</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>개인정보 암호화(비밀번호, 주요 데이터)</li>
                <li>해킹/바이러스 대비 보안프로그램 설치 및 점검</li>
                <li>접근권한 관리 및 최소화, 침입차단시스템 운영</li>
                <li>접속기록 보관 및 위변조 방지(최소 6개월)</li>
                <li>정기적 보안 감사 및 취약점 점검</li>
                <li>ISO 27001, SOC 2 Type II 등 국제 인증 준수</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 쿠키(Cookie) 운영</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>서비스 이용 편의 및 맞춤형 서비스 제공을 위해 쿠키 사용</li>
                <li>이용자는 브라우저 설정을 통해 쿠키 저장 거부 가능(단, 일부 서비스 이용 제한 가능)</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 개인정보의 국외 이전</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>클라우드 서버(AWS, Google Cloud) 및 이메일 발송(SendGrid 등) 등 일부 서비스는 국외에서 운영될 수 있음</li>
                <li>국외 이전 시 관련 법령에 따라 안전하게 보호</li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 개인정보 보호책임자 및 문의처</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>개인정보 보호책임자</strong></p>
                <p>성명: 이수진</p>
                <p>직책: Chief Legal Officer</p>
                <p>이메일: privacy@lawkit.co.kr</p>
                <p>전화: 02-1234-5678</p>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. 정책 변경 및 고지</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>본 방침은 시행일로부터 적용되며, 변경 시 최소 7일 전 홈페이지 공지</li>
                <li>중대한 변경(수집 항목, 목적, 제3자 제공 등)은 최소 30일 전 사전 고지</li>
              </ul>
            </div>
            {/* --- END NEW DETAILED POLICY CONTENT --- */}
          </div>
          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              개인정보 보호에 대한 문의사항이 있으신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              개인정보 처리방침에 대한 궁금한 점이나<br/>
              개인정보 관련 문의사항이 있으시면 언제든지 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                문의하기
              </Link>
              <a
                href="mailto:privacy@lawkit.co.kr"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                개인정보 담당자에게 이메일
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 