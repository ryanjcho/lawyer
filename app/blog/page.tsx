'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, EyeIcon, CalendarIcon, UserIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';

// Example blog data (to be replaced with real data or CMS integration)
const blogPosts = [
  {
    id: 1,
    title: '계약 검토 혁신의 실제 사례: 스타트업의 성공 스토리',
    summary: '강남 최고급 로펌이 제공하는 혁신적인 계약 검토 프로세스를 통해 스타트업이 어떻게 50%의 계약 검토 시간을 단축하고 리스크를 최소화했는지 알아봅니다.',
    date: '2024.03.15',
    tags: ['성공사례', '계약 검토', '스타트업'],
    author: '김용범 변호사',
    authorTitle: '파트너변호사/경영총괄',
    authorAvatar: '/avatars/kim-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/contract-review-success.jpg',
    featured: true,
    readTime: '8분',
    views: '2,847',
    category: '성공사례',
  },
  {
    id: 2,
    title: '2024년 계약 리스크 관리 완벽 가이드',
    summary: 'LawKit의 AI와 전문 변호사가 제공하는 효과적인 계약 리스크 관리 방법과 전략을 단계별로 소개합니다. 실무에서 바로 적용할 수 있는 팁들을 포함했습니다.',
    date: '2024.03.10',
    tags: ['가이드', '리스크 관리', '2024'],
    author: '오성헌 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/oh-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/risk-management-guide.jpg',
    featured: false,
    readTime: '12분',
    views: '1,923',
    category: '가이드',
  },
  {
    id: 3,
    title: '디지털 전환 시대의 계약 관리 트렌드 분석',
    summary: '디지털 전환 시대의 계약 관리 트렌드와 LawKit의 대응 방안을 살펴봅니다. AI, 블록체인, 클라우드 기술이 계약 관리에 미치는 영향을 분석합니다.',
    date: '2024.03.05',
    tags: ['인사이트', '디지털', '트렌드'],
    author: '엄태섭 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/eom-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/digital-transformation.jpg',
    featured: false,
    readTime: '10분',
    views: '1,456',
    category: '인사이트',
  },
  {
    id: 4,
    title: 'M&A 계약서 검토 시 주의해야 할 핵심 포인트',
    summary: 'M&A 거래에서 계약서 검토 시 반드시 확인해야 할 핵심 조항들과 일반적인 함정들을 전문 변호사의 관점에서 분석합니다.',
    date: '2024.02.28',
    tags: ['M&A', '계약 검토', '전문가 팁'],
    author: '김용범 변호사',
    authorTitle: '파트너변호사/경영총괄',
    authorAvatar: '/avatars/kim-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/ma-contract-review.jpg',
    featured: false,
    readTime: '15분',
    views: '1,234',
    category: '전문가 팁',
  },
  {
    id: 5,
    title: 'AI 기반 계약 검토의 정확도와 한계점',
    summary: 'LawKit의 AI 기술이 계약 검토에서 어떤 역할을 하는지, 그리고 인간 전문가와의 협업이 왜 중요한지에 대해 심층 분석합니다.',
    date: '2024.02.20',
    tags: ['AI', '기술', '정확도'],
    author: '엄태섭 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/eom-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/ai-accuracy.jpg',
    featured: false,
    readTime: '11분',
    views: '1,789',
    category: '기술',
  },
  {
    id: 6,
    title: '해외 진출 시 필수 계약 조항 체크리스트',
    summary: '해외 시장 진출을 고려하는 기업들을 위한 필수 계약 조항들과 각 국가별 특별 고려사항을 정리한 실용적인 가이드입니다.',
    date: '2024.02.15',
    tags: ['해외진출', '체크리스트', '국제계약'],
    author: '오성헌 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/oh-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/overseas-expansion.jpg',
    featured: false,
    readTime: '13분',
    views: '987',
    category: '가이드',
  },
  {
    id: 7,
    title: '개인정보보호법 개정에 따른 계약서 수정 가이드',
    summary: '최근 개정된 개인정보보호법에 따라 계약서에 반드시 포함해야 할 조항들과 수정이 필요한 부분들을 상세히 안내합니다.',
    date: '2024.02.10',
    tags: ['개인정보보호법', '법규', '가이드'],
    author: '조진석 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/cho-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/privacy-law.jpg',
    featured: false,
    readTime: '9분',
    views: '1,567',
    category: '법규',
  },
  {
    id: 8,
    title: '클라우드 서비스 계약서 검토 시 주의사항',
    summary: '클라우드 서비스 도입 시 계약서에서 반드시 확인해야 할 SLA, 데이터 보안, 책임 한계 등 핵심 조항들을 분석합니다.',
    date: '2024.02.05',
    tags: ['클라우드', 'SLA', '데이터보안'],
    author: '엄태섭 변호사',
    authorTitle: '파트너변호사',
    authorAvatar: '/avatars/eom-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/cloud-contract.jpg',
    featured: false,
    readTime: '14분',
    views: '1,123',
    category: '전문가 팁',
  },
  {
    id: 9,
    title: '법무법인에서 LawKit 도입 후 변화된 업무 프로세스',
    summary: '실제 법무법인에서 LawKit을 도입한 후 계약 검토 업무가 어떻게 변화했는지, 그리고 어떤 성과를 거두었는지 사례를 통해 소개합니다.',
    date: '2024.01.30',
    tags: ['도입사례', '업무프로세스', '성과'],
    author: '김용범 변호사',
    authorTitle: '파트너변호사/경영총괄',
    authorAvatar: '/avatars/kim-lawyer.jpg',
    href: '#',
    thumbnail: '/blog/law-firm-case.jpg',
    featured: false,
    readTime: '7분',
    views: '2,156',
    category: '성공사례',
  },
];

const categories = [
  '전체',
  '가이드',
  '템플릿',
  '성공사례',
  '법률 뉴스',
  '리스크 관리',
  '인사이트',
  '전문가 팁',
  '기술',
  '법규',
];

const tags = [
  '계약 검토',
  'AI',
  '리스크 관리',
  '디지털',
  '성공사례',
  '가이드',
  '템플릿',
  '법률 뉴스',
  '인사이트',
  'M&A',
  '스타트업',
  '해외진출',
  '클라우드',
  '개인정보보호법',
  'SLA',
  '2024',
];

// Popular posts (based on views)
const popularPosts = blogPosts
  .sort((a, b) => parseInt(b.views.replace(',', '')) - parseInt(a.views.replace(',', '')))
  .slice(0, 5);

// Featured authors
const featuredAuthors = [
  {
    name: '김용범 변호사',
    title: '파트너변호사/경영총괄',
    avatar: '/avatars/kim-lawyer.jpg',
    posts: 12,
    specialty: 'M&A, 기업법무, 스타트업',
  },
  {
    name: '오성헌 변호사',
    title: '파트너변호사',
    avatar: '/avatars/oh-lawyer.jpg',
    posts: 8,
    specialty: '위기관리, 기업자문, 인사노무',
  },
  {
    name: '엄태섭 변호사',
    title: '파트너변호사',
    avatar: '/avatars/eom-lawyer.jpg',
    posts: 15,
    specialty: '기업위기관리, 규제산업, 사이버범죄',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.includes(search) ||
      post.summary.includes(search) ||
      post.author.includes(search);
    return matchesCategory && matchesTag && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">블로그</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">계약 검토와 법률 실무에 관한 인사이트, 가이드, 성공사례, 그리고 최신 소식을 전합니다.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 py-16">
        {/* Sidebar: Categories, Tags, Popular Posts, Authors */}
        <aside className="w-full lg:w-80 mb-8 lg:mb-0 space-y-6">
          {/* Categories & Tags */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">카테고리</h2>
            <ul className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`px-3 py-1 rounded-full font-medium transition-colors border ${selectedCategory === cat ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-md font-semibold mb-2 text-gray-800">태그</h3>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <button
                    className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${selectedTag === tag ? 'bg-indigo-200 text-indigo-800 border-indigo-300' : 'text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  >
                    #{tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Posts */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-indigo-600" />
              인기 글
            </h2>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <div key={post.id} className="flex items-start gap-3">
                  <span className="text-sm font-bold text-indigo-600 min-w-[20px]">#{index + 1}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                      <Link href={post.href} className="hover:text-indigo-600">
                        {post.title}
                      </Link>
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <EyeIcon className="w-3 h-3" />
                      <span>{post.views}</span>
                      <ClockIcon className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Authors */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-indigo-600" />
              전문 변호사
            </h2>
            <div className="space-y-4">
              {featuredAuthors.map((author) => (
                <div key={author.name} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                  <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{author.name}</h4>
                    <p className="text-xs text-gray-600">{author.title}</p>
                    <p className="text-xs text-indigo-600">{author.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Blog Content */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="mb-8 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-900 bg-white shadow-sm"
              />
              <BookOpenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-500">
              총 {filteredPosts.length}개의 글
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-lg border border-indigo-200 p-8">
                <img src={featuredPost.thumbnail} alt="썸네일" className="w-full md:w-80 h-56 object-cover rounded-xl shadow-md mb-4 md:mb-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-indigo-600 font-medium flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="text-xs text-gray-400">by {featuredPost.author}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <EyeIcon className="w-3 h-3" />
                      {featuredPost.views}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{featuredPost.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium border border-indigo-200">#{tag}</span>
                    ))}
                  </div>
                  <Link href={featuredPost.href} className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog Post Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {otherPosts.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12">
                <BookOpenIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
            {otherPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100 flex flex-col hover:shadow-xl transition-shadow">
                <img src={post.thumbnail} alt="썸네일" className="w-full h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-indigo-600 font-medium flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {post.date}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ClockIcon className="w-3 h-3" />
                      <span>{post.readTime}</span>
                      <EyeIcon className="w-3 h-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.summary}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs text-gray-500">{post.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium border border-indigo-200">#{tag}</span>
                    ))}
                  </div>
                  <Link href={post.href} className="text-indigo-600 hover:text-indigo-700 font-medium mt-auto">자세히 보기 →</Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Newsletter CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">더 많은 법률 인사이트를 받아보세요</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            LawKit이 정기적으로 업데이트하는 계약 검토 관련 콘텐츠를<br />뉴스레터로 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              뉴스레터 구독하기
            </Link>
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              무료 체험 시작하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 