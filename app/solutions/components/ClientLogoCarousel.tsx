'use client';

import Image from 'next/image';

const CLIENT_LOGOS = [
  { src: '/client-logos/samsung.png', alt: '삼성' },
  { src: '/client-logos/lg.png', alt: 'LG' },
  { src: '/client-logos/hanwha.png', alt: '한화' },
  { src: '/client-logos/kakao.png', alt: '카카오' },
  { src: '/client-logos/naver.png', alt: '네이버' },
  { src: '/client-logos/sk.png', alt: 'SK' },
  { src: '/client-logos/hyundai.png', alt: '현대' },
  { src: '/client-logos/cj.png', alt: 'CJ' },
  { src: '/client-logos/lotte.png', alt: '롯데' },
  { src: '/client-logos/posco.png', alt: '포스코' },
  // ...add more as needed
];

export default function ClientLogoCarousel() {
  return (
    <section className="bg-white py-8 px-2 shadow-sm rounded-xl mb-8">
      <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 items-center animate-scroll-x hover:[animation-play-state:paused]">
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 w-32 h-16 flex items-center justify-center">
              <Image src={logo.src} alt={logo.alt} width={120} height={48} className="object-contain grayscale hover:grayscale-0 transition" />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
} 