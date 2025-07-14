// Refactor: Only export a generator, not random data
import seedrandom from 'seedrandom';
const rng = seedrandom('analytics-contracts-seed');
export function generateMockContracts(count = 50) {
  const clients = [
    'Acme Corporation', 'Beta LLC', 'Gamma Industries', 'Delta Partners', 'Epsilon Ltd',
    'Zeta Solutions', 'Eta Technologies', 'Theta Systems', 'Iota Networks', 'Kappa Corp'
  ];
  const lawyers = [
    '오성헌', '김용범', '엄태섭', '조진석'
  ];
  const contractTypes = [
    'NDA', 'MSA', 'SLA', 'Consulting Agreement', 'IP Agreement',
    'Employment Contract', 'Service Agreement', 'License Agreement', 'Partnership Agreement', 'Vendor Contract'
  ];
  const statuses = ['awaiting_ai', 'ai_complete', 'lawyer_review', 'needs_info', 'complete', 'overdue'];
  const riskLevels = ['low', 'medium', 'high', 'critical'];
  const tags = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Real Estate', 'Education', 'Legal'];

  const now = new Date('2024-07-07T09:00:00+09:00'); // Fixed base date

  return Array.from({ length: count }, (_, i) => {
    const isUrgent = rng() < 0.15;
    const riskLevel = riskLevels[Math.floor(rng() * riskLevels.length)];
    const status = statuses[Math.floor(rng() * statuses.length)];
    const contractType = contractTypes[Math.floor(rng() * contractTypes.length)];
    const client = clients[Math.floor(rng() * clients.length)];
    const lawyer = lawyers[Math.floor(rng() * lawyers.length)];
    // Generate realistic dates
    const uploadedDate = new Date(now.getTime() - Math.floor(rng() * 1000 * 60 * 60 * 24 * 30)); // up to 30 days ago
    const lastUpdated = new Date(uploadedDate.getTime() + rng() * 7 * 24 * 60 * 60 * 1000);
    const keyDate = new Date(now.getTime() + rng() * 14 * 24 * 60 * 60 * 1000);
    return {
      id: `C-2024-${String(i + 1).padStart(3, '0')}`,
      name: `${contractType} - ${client}`,
      client,
      type: rng() > 0.5 ? 'review' : 'draft',
      status,
      lastUpdated: lastUpdated.toISOString(),
      lawyer,
      keyDate: keyDate.toISOString().split('T')[0],
      urgent: isUrgent,
      riskLevel,
      value: Math.floor(rng() * 10000000) + 1000000,
      tags: tags.slice(0, Math.floor(rng() * 3) + 1),
      clientContact: `${lawyer.toLowerCase().replace(' ', '.')}@${client.toLowerCase().replace(' ', '')}.com`,
      estimatedCompletion: new Date(keyDate.getTime() - rng() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      slaDeadline: new Date(lastUpdated.getTime() + (5 + rng() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: uploadedDate.toISOString(),
      completedAt: rng() > 0.5 ? new Date(lastUpdated.getTime() + rng() * 5 * 24 * 60 * 60 * 1000).toISOString() : null,
      slaViolated: rng() < 0.1,
      risk: riskLevel,
      uploadedAt: uploadedDate.toISOString()
    };
  });
} 