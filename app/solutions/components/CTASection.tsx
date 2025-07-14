export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">귀사의 업종에 맞는 맞춤형 법률 솔루션을 상담해보세요.</h2>
      <p className="mb-10 text-lg md:text-xl">로킷과 오킴스가 함께하는 업계별 전문 자문을 지금 경험해보세요.</p>
      <a
        href="/contact"
        className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-100 transition text-lg"
      >
        상담 신청하기
      </a>
    </section>
  );
} 