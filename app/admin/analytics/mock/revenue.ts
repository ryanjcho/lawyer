import seedrandom from 'seedrandom';
const rng = seedrandom('revenue-seed');
export function generateMockRevenue(months = 12) {
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    return {
      month: date.toLocaleDateString('ko-KR', { month: 'numeric', timeZone: 'Asia/Seoul' }),
      value: Math.floor(rng() * 20000000) + 5000000
    };
  });
} 