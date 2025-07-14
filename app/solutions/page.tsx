// 'use client' 지시문은 metadata export를 위해 제거되었습니다.
import HeroSection from './components/HeroSection';
import ClientLogoCarousel from './components/ClientLogoCarousel';
import IndustrySolutionsGrid from './components/IndustrySolutionsGrid';
import CTASection from './components/CTASection';

export const metadata = {
  title: '업계별 맞춤 법률 솔루션 | 로킷 x 오킴스',
  description: '로킷은 법무법인 오킴스와 함께 제약, IT, 투자, 엔터테인먼트 등 다양한 산업군에 특화된 실전 법률 솔루션을 제공합니다. 실제 사례, 고객 후기, 업계별 전문성까지 한눈에 확인하세요.',
  openGraph: {
    title: '업계별 맞춤 법률 솔루션 | 로킷 x 오킴스',
    description: '로킷은 법무법인 오킴스와 함께 제약, IT, 투자, 엔터테인먼트 등 다양한 산업군에 특화된 실전 법률 솔루션을 제공합니다.',
    url: 'https://lawkit.kr/solutions',
    siteName: '로킷',
    images: [
      {
        url: '/og-solutions.png',
        width: 1200,
        height: 630,
        alt: '로킷 업계별 맞춤 법률 솔루션',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <HeroSection />
      <ClientLogoCarousel />
      <IndustrySolutionsGrid />
      <CTASection />
    </main>
  );
} 