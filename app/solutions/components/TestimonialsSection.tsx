export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-indigo-800 mb-12 text-center">고객 후기</h2>
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-gray-700 mb-2">“오킴스의 업계별 전문성과 신속한 대응 덕분에 복잡한 계약도 안심하고 진행할 수 있었습니다.”</div>
            <div className="text-xs text-gray-500">- 국내 IT 기업 법무팀</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center border border-gray-100">
            <div className="text-gray-700 mb-2">“실제 사례 중심의 자문이 큰 도움이 되었고, 현장 경험이 느껴졌습니다.”</div>
            <div className="text-xs text-gray-500">- 제약회사 대표</div>
          </div>
        </div>
      </div>
    </section>
  );
} 