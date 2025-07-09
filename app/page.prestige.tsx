import Link from 'next/link';
import Image from 'next/image';
import Testimonials from './components/Testimonials';
import { Bars3Icon } from '@heroicons/react/24/solid'

export default function PrestigeHome() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 text-white" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block">기업도 개인도,</span>
              <span className="block text-indigo-200">전문가의 법률 감각을 온라인으로.</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto font-semibold">
              대한민국 최고 수준의 경력을 자랑하는 부티크 로펌의 변호사들이<br />
              이제는 온라인으로, 누구나 쉽게, 합리적인 비용으로 만날 수 있습니다.
            </p>
            <p className="text-lg md:text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              방문 없이, 클릭 한 번으로. <span className="font-bold text-white">신뢰와 품격</span>을 갖춘 전문가가<br />
              여러분의 계약을 직접 분석하고, 빠르고 정확하게 안내해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/trial"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="무료 체험 시작하기"
              >
                무료 체험 시작하기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="상담 신청"
              >
                상담 신청
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="요금제 보기"
              >
                요금제 보기
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">실제 변호사 직접 검토</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">합리적 비용, 명확한 결과</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">신속한 피드백</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">24시간 언제나, 어디서나</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">로펌의 신뢰와 품격</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white" aria-labelledby="value-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="value-heading" className="text-3xl font-bold text-gray-900 mb-4">
              언제 어디서나, 최고의 법률 전문가를 만나다
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-4">
              오랜 경험과 전문성을 갖춘 변호사들이 직접 참여하는<br />
              <span className="font-semibold text-indigo-600">신뢰할 수 있는 계약 분석 서비스</span>를 온라인으로 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">합리적 비용, 명확한 결과</h3>
              <p className="text-gray-600 mb-4">고품질의 법률 서비스를 누구나 부담 없이.<br />
                투명한 요금제와 명확한 분석 리포트로 신뢰를 더합니다.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">신속한 피드백, 빠른 대응</h3>
              <p className="text-gray-600 mb-4">계약서 업로드 후, 빠른 시간 내에 전문가의 분석 결과를 받아보세요.<br />
                궁금한 점은 언제든 문의 가능합니다.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">로펌의 신뢰와 품격</h3>
              <p className="text-gray-600 mb-4">수많은 기업과 개인을 위한 자문 경험.<br />
                대한민국을 대표하는 변호사들이 직접 참여합니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-indigo-100 shadow text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">24시간, 언제 어디서나</h3>
              <p className="text-gray-600 mb-4">시간과 장소의 제약 없이, 온라인으로 간편하게.<br />
                오프라인 방문 없이도 최고의 법률 서비스를 누리세요.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-indigo-100 shadow text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">실제 변호사 직접 검토</h3>
              <p className="text-gray-600 mb-4">AI가 아닌, 실제 변호사가 직접 분석하고<br />
                책임지는 결과를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">고객 후기</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              실제 고객들이 경험한 신뢰와 만족.<br />
              여러분도 온라인으로 최고의 법률 서비스를 경험해보세요.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">지금 바로, 전문가의 법률 감각을 온라인으로 경험하세요.</h2>
          <p className="text-xl mb-8">오프라인 방문 없이, 클릭 한 번으로.<br />
            대한민국 최고의 변호사들이 여러분을 기다립니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label="무료 체험 시작하기"
            >
              무료 체험 시작하기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="상담 신청"
            >
              상담 신청
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 