export function generateMockRevenue(months = 12) {
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    return {
      month: date.toISOString().slice(0, 7),
      value: Math.floor(Math.random() * 20000000) + 5000000
    };
  });
} 