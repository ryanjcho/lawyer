'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Example blog data (to be replaced with real data or CMS integration)
const blogPosts = [
  {
    id: 1,
    title: '계약 검토 혁신의 실제 사례',
    summary: '강남 최고급 로펌이 제공하는 혁신적인 계약 검토 프로세스를 알아봅니다.',
    date: '2024.03.15',
    tags: ['성공사례', '계약 검토'],
    author: '김변호사',
    href: '#',
    thumbnail: '/placeholder-blog-1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: '계약 리스크 관리 가이드',
    summary: 'LawKit의 AI와 전문 변호사가 제공하는 효과적인 계약 리스크 관리 방법과 전략을 소개합니다.',
    date: '2024.03.10',
    tags: ['가이드', '리스크 관리'],
    author: '이변호사',
    href: '#',
    thumbnail: '/placeholder-blog-2.jpg',
    featured: false,
  },
  {
    id: 3,
    title: '디지털 전환과 계약 관리',
    summary: '디지털 전환 시대의 계약 관리 트렌드와 LawKit의 대응 방안을 살펴봅니다.',
    date: '2024.03.05',
    tags: ['인사이트', '디지털'],
    author: '박변호사',
    href: '#',
    thumbnail: '/placeholder-blog-3.jpg',
    featured: false,
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
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.tags.includes(selectedCategory);
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
        {/* Sidebar: Categories & Tags */}
        <aside className="w-full lg:w-72 mb-8 lg:mb-0">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24 border border-indigo-100">
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
        </aside>

        {/* Main Blog Content */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="mb-8 flex items-center gap-3">
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-xs px-4 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-900 bg-white shadow-sm"
            />
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-lg border border-indigo-200 p-8">
                <img src={featuredPost.thumbnail} alt="썸네일" className="w-full md:w-64 h-48 object-cover rounded-xl shadow-md mb-4 md:mb-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-indigo-600 font-medium">{featuredPost.date}</span>
                    <span className="text-xs text-gray-400">by {featuredPost.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{featuredPost.title}</h2>
                  <p className="text-gray-700 mb-4">{featuredPost.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium border border-indigo-200">#{tag}</span>
                    ))}
                  </div>
                  <Link href={featuredPost.href} className="text-indigo-600 hover:text-indigo-700 font-semibold">자세히 보기 →</Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12">검색 결과가 없습니다.</div>
            )}
            {otherPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100 flex flex-col hover:shadow-xl transition-shadow">
                <img src={post.thumbnail} alt="썸네일" className="w-full h-40 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-indigo-600 font-medium">{post.date}</span>
                    <span className="text-xs text-gray-400">by {post.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
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