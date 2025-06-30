'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">이용약관</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              LawScan 서비스 이용에 관한 약관입니다<br/>
              <span className="font-semibold">마지막 업데이트: 2024년 1월 1일</span>
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-600 leading-relaxed">
                이 약관은 LawScan(이하 &quot;회사&quot;)이 제공하는 AI 기반 계약 리스크 관리 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (정의)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. &quot;서비스&quot;란 회사가 제공하는 AI 기반 계약 리스크 분석 및 관리 서비스를 의미합니다.</p>
                <p>2. &quot;이용자&quot;란 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</p>
                <p>3. &quot;계약서&quot;란 이용자가 서비스에 업로드하여 분석을 요청하는 모든 종류의 계약 문서를 의미합니다.</p>
                <p>4. &quot;분석 결과&quot;란 회사의 AI 시스템과 전문 변호사가 계약서를 분석하여 제공하는 리스크 평가 및 개선 제안을 의미합니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (서비스의 제공)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사는 이용자에게 다음과 같은 서비스를 제공합니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>계약서 업로드 및 AI 기반 1차 분석</li>
                  <li>전문 변호사의 2차 검증 및 심층 분석</li>
                  <li>리스크 평가 및 개선 제안서 제공</li>
                  <li>계약 모니터링 및 관리 서비스</li>
                </ul>
                <p>2. 서비스의 구체적인 내용은 회사의 웹사이트 및 서비스 내에서 확인할 수 있습니다.</p>
                <p>3. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있으며, 이 경우 사전에 공지합니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (이용계약의 체결)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 이용계약은 이용자가 이 약관에 동의하고 회원가입을 완료함으로써 체결됩니다.</p>
                <p>2. 회사는 다음 각 호에 해당하는 경우 이용계약의 체결을 거부할 수 있습니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위 정보를 기재하거나 회사가 요구하는 정보를 제공하지 않은 경우</li>
                  <li>이용자의 귀책사유로 인증이 불가능한 경우</li>
                  <li>이미 가입된 회원과 동일한 정보로 가입을 신청한 경우</li>
                  <li>기타 회사가 정한 이용신청 요건을 충족하지 못한 경우</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (서비스 이용)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 이용자는 서비스 이용 시 다음 사항을 준수해야 합니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>관련 법령 및 이 약관의 준수</li>
                  <li>회사의 서비스 운영에 지장을 주는 행위 금지</li>
                  <li>타인의 권리나 명예, 신용 등을 침해하는 행위 금지</li>
                  <li>서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통하는 행위 금지</li>
                </ul>
                <p>2. 이용자는 업로드하는 계약서에 대한 적법한 권리를 보유해야 합니다.</p>
                <p>3. 회사는 이용자가 이 약관을 위반하는 경우 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (개인정보보호)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다.</p>
                <p>2. 개인정보의 수집, 이용, 제공 등에 관한 자세한 내용은 개인정보처리방침을 통해 확인할 수 있습니다.</p>
                <p>3. 회사는 이용자의 개인정보를 암호화하여 저장하고 관리합니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (서비스의 중단)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사는 다음 각 호의 경우 서비스 제공을 중단할 수 있습니다:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>서비스용 설비의 점검, 보수 또는 공사로 인한 부득이한 경우</li>
                  <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                  <li>기타 불가항력적 사유가 있는 경우</li>
                </ul>
                <p>2. 회사는 서비스 중단 시 사전에 공지하며, 부득이한 경우 사후 공지할 수 있습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (요금 및 결제)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 서비스 이용 요금은 회사가 정한 요금표에 따릅니다.</p>
                <p>2. 이용자는 회사가 정한 방법으로 요금을 납부해야 합니다.</p>
                <p>3. 요금 미납 시 회사는 서비스 이용을 제한할 수 있습니다.</p>
                <p>4. 환불에 관한 사항은 회사의 환불 정책에 따릅니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (분석 결과의 성질)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사가 제공하는 분석 결과는 참고 자료이며, 최종 법적 판단의 근거가 되지 않습니다.</p>
                <p>2. 이용자는 중요한 법적 결정을 내리기 전에 전문 변호사와 상담해야 합니다.</p>
                <p>3. 회사는 분석 결과의 정확성을 위해 최선을 다하지만, 완벽한 정확성을 보장하지는 않습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (면책조항)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                <p>2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                <p>3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.</p>
                <p>4. 회사는 이용자가 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관해는 책임을 지지 않습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제11조 (분쟁해결)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</p>
                <p>2. 회사와 이용자 간에 발생한 전자상거래 분쟁에 관하여는 소비자분쟁조정위원회의 조정에 따를 수 있습니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제12조 (재판권 및 준거법)</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 회사와 이용자 간에 발생한 분쟁에 관하여는 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.</p>
                <p>2. 회사와 이용자 간에 제기된 소송에는 대한민국법을 준거법으로 합니다.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
              <div className="space-y-4 text-gray-600">
                <p>1. 이 약관은 2024년 1월 1일부터 시행합니다.</p>
                <p>2. 이 약관의 시행일자 이전에 체결된 계약에 대해서는 종전의 약관을 적용합니다.</p>
              </div>
            </div>
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