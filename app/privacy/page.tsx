'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">개인정보처리방침</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              LawScan의 개인정보 수집 및 이용에 관한 안내입니다<br/>
              <span className="font-semibold">마지막 업데이트: 2024년 1월 1일</span>
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                LawScan(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 
                다음의 목적 이외의 용도로는 이용하지 않습니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>서비스 제공 및 계정 관리</li>
                <li>계약서 분석 및 리스크 평가</li>
                <li>고객 지원 및 문의 응대</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
                <li>마케팅 및 광고 활용 (동의 시)</li>
                <li>법적 의무 이행</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">필수 수집 항목</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>이름, 이메일 주소, 비밀번호</li>
                    <li>회사명, 직책 (기업 고객의 경우)</li>
                    <li>서비스 이용 기록 및 분석 데이터</li>
                    <li>결제 정보 (신용카드 정보는 결제업체에서 관리)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">선택 수집 항목</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>전화번호, 주소</li>
                    <li>마케팅 정보 수신 동의 여부</li>
                    <li>서비스 이용 통계 및 분석 데이터</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                  <li>웹사이트 방문기록: 3개월</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 원칙적으로 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단, 다음의 경우에는 개인정보를 처리할 수 있습니다.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>이용자가 사전에 제3자 제공에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                  <li>이용자 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 이용자 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 개인정보의 처리위탁</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">위탁업무</th>
                        <th className="text-left py-2">위탁업체</th>
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
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
              <div className="space-y-4 text-gray-600">
                <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제요구</li>
                  <li>처리정지 요구</li>
                </ul>
                <p>제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 개인정보의 파기</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">파기절차</h3>
                  <p>불필요한 개인정보 및 개인정보파일은 개인정보보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">파기방법</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                    <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 개인정보의 안전성 확보 조치</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>개인정보의 암호화: 이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하여 사용합니다.</li>
                  <li>해킹 등에 대비한 기술적 대책: 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
                  <li>개인정보에 대한 접근 제한: 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
                  <li>접속기록의 보관 및 위변조 방지: 개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 개인정보 보호책임자</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>개인정보 보호책임자</strong></p>
                  <p>성명: 이수진</p>
                  <p>직책: Chief Legal Officer</p>
                  <p>연락처: privacy@lawscan.co.kr</p>
                  <p>전화: 02-1234-5678</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 개인정보 처리방침 변경</h2>
              <div className="space-y-4 text-gray-600">
                <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 개인정보의 안전한 전송</h2>
              <div className="space-y-4 text-gray-600">
                <p>회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 보안 조치를 취하고 있습니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS 암호화를 통한 안전한 데이터 전송</li>
                  <li>계약서 업로드 시 즉시 암호화하여 저장</li>
                  <li>분석 완료 후 자동 문서 삭제</li>
                  <li>정기적인 보안 감사 및 취약점 점검</li>
                  <li>ISO 27001, SOC 2 Type II 인증 준수</li>
                </ul>
              </div>
            </div>
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
                href="mailto:privacy@lawscan.co.kr"
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