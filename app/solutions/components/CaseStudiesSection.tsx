export default function CaseStudiesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-indigo-800 mb-12 text-center">실제 자문 사례</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">제약·의료기기</div>
            <div className="font-semibold mb-2">국내 대형 제약사 신약 라이선스 계약</div>
            <div className="text-gray-700 text-sm">신약 개발 단계에서 글로벌 제약사와의 라이선스 계약 체결을 성공적으로 지원</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">IT</div>
            <div className="font-semibold mb-2">글로벌 IT 기업 개인정보보호 컴플라이언스 구축</div>
            <div className="text-gray-700 text-sm">국내외 개인정보보호법 준수를 위한 체계 구축 및 실무 자문 제공</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">투자회사</div>
            <div className="font-semibold mb-2">국내 스타트업 투자계약 자문</div>
            <div className="text-gray-700 text-sm">글로벌 투자회사의 국내 스타트업 투자계약 실사 및 계약 체결 지원</div>
          </div>
        </div>
      </div>
    </section>
  );
} 