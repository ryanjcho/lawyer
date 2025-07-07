'use client';

import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  industry: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "김영수",
    position: "법무팀장",
    company: "테크스타트업 A",
    content: "LawScan 덕분에 계약 검토 시간이 70% 단축되었습니다. AI의 정확도가 놀라울 정도로 높고, 전문 변호사의 이중 검증으로 완벽한 안정감을 느낍니다. 특히 M&A 계약에서 놓칠 수 있는 리스크를 사전에 발견해주어 큰 도움이 되었습니다.",
    rating: 5,
    industry: "기술"
  },
  {
    id: 2,
    name: "박미영",
    position: "CEO",
    company: "핀테크 스타트업 B",
    content: "강남 최고급 로펌의 전문성을 AI로 접근할 수 있다는 것이 가장 큰 매력이었습니다. 투자 계약서 검토에서 놓치기 쉬운 조항들을 정확히 짚어주어 투자자들과의 협상에서 큰 힘이 되었습니다. 비용도 기존 대비 60% 절약할 수 있었습니다.",
    rating: 5,
    industry: "금융"
  },
  {
    id: 3,
    name: "이준호",
    position: "사업개발팀장",
    company: "제조업체 C",
    content: "해외 공급업체와의 계약에서 언어 장벽과 법적 차이로 고민했는데, LawScan이 영어 계약서도 정확히 분석해주어 큰 도움이 되었습니다. 특히 손해배상 조항과 해지 조건을 명확히 분석해주어 안전하게 계약을 체결할 수 있었습니다.",
    rating: 5,
    industry: "제조"
  },
  {
    id: 4,
    name: "최지은",
    position: "인사팀장",
    company: "헬스케어 기업 D",
    content: "고용 계약서와 NDA 검토에 LawScan을 활용하고 있습니다. AI가 빠르게 문제점을 찾아주고, 전문 변호사가 실무적인 조언을 해주어 인사 업무가 훨씬 효율적이 되었습니다. 특히 대량의 계약서를 처리할 때 시간 절약이 컸습니다.",
    rating: 5,
    industry: "헬스케어"
  },
  {
    id: 5,
    name: "정민수",
    position: "부동산 개발사 E",
    company: "부동산 개발사 E",
    content: "부동산 개발 프로젝트의 복잡한 계약들을 LawScan으로 검토하고 있습니다. 토지 매매계약, 건설계약, 분양계약 등 다양한 계약 유형을 정확히 분석해주어 프로젝트 리스크를 최소화할 수 있었습니다. 투자 대비 효과가 매우 뛰어납니다.",
    rating: 5,
    industry: "부동산"
  },
  {
    id: 6,
    name: "한소영",
    position: "법무이사",
    company: "유통기업 F",
    content: "전국 지점과의 프랜차이즈 계약, 공급업체 계약 등을 LawScan으로 일괄 검토하고 있습니다. AI가 표준 계약서의 문제점을 빠르게 찾아주고, 전문 변호사가 실무적인 개선안을 제시해주어 법무 업무 효율성이 크게 향상되었습니다.",
    rating: 5,
    industry: "유통"
  }
];

const industries = ["전체", "기술", "금융", "제조", "헬스케어", "부동산", "유통"];

export default function Testimonials() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("전체");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = selectedIndustry === "전체" 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.industry === selectedIndustry);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentTestimonial = filteredTestimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-gray-900 mb-4">
            고객들의 생생한 후기
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LawScan을 통해 계약 리스크를 성공적으로 관리한<br/>
            <span className="font-semibold">실제 고객들의 경험담을 들어보세요</span>
          </p>
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => {
                setSelectedIndustry(industry);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedIndustry === industry
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Testimonial Display */}
        {currentTestimonial && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {currentTestimonial.rating}.0/5.0
                  </span>
                </div>

                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{currentTestimonial.content}&quot;
                </blockquote>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-semibold text-lg">
                      {currentTestimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentTestimonial.position}, {currentTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors"
                  aria-label="이전 후기"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors"
                  aria-label="다음 후기"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                    aria-label={`후기 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-gray-600">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">70%</div>
            <div className="text-gray-600">평균 시간 단축</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">60%</div>
            <div className="text-gray-600">비용 절약</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">만족한 고객</div>
          </div>
        </div>
      </div>
    </section>
  );
} 