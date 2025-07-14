'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white py-28 md:py-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg text-indigo-100">
          업계별 맞춤 솔루션, 오킴스와 함께
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 mb-8 max-w-2xl mx-auto">
          로킷은 법무법인 오킴스와 함께 다양한 산업군의 실전 경험을 바탕으로 최적의 법률 솔루션을 제공합니다.
        </p>
      </motion.div>
    </section>
  );
} 