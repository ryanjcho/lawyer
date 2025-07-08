// Refactor: Only export a generator, not random data
export function generateMockContracts(count = 50) {
  const clients = [
    'Acme Corporation', 'Beta LLC', 'Gamma Industries', 'Delta Partners', 'Epsilon Ltd',
    'Zeta Solutions', 'Eta Technologies', 'Theta Systems', 'Iota Networks', 'Kappa Corp'
  ];
  const lawyers = [
    'Jane Smith', 'John Doe', 'Emily Lee', 'Michael Chen', 'Sarah Johnson',
    'David Kim', 'Lisa Park', 'Robert Wilson', 'Maria Garcia', 'James Brown'
  ];
  const contractTypes = [
    'NDA', 'MSA', 'SLA', 'Consulting Agreement', 'IP Agreement',
    'Employment Contract', 'Service Agreement', 'License Agreement', 'Partnership Agreement', 'Vendor Contract'
  ];
  const statuses = ['awaiting_ai', 'ai_complete', 'lawyer_review', 'needs_info', 'complete', 'overdue'];
  const riskLevels = ['low', 'medium', 'high', 'critical'];
  const tags = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Real Estate', 'Education', 'Legal'];

  return Array.from({ length: count }, (_, i) => {
    const isUrgent = Math.random() < 0.15;
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const lawyer = lawyers[Math.floor(Math.random() * lawyers.length)];
    // Generate realistic dates
    const uploadedDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const lastUpdated = new Date(uploadedDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    const keyDate = new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000);
    return {
      id: `C-2024-${String(i + 1).padStart(3, '0')}`,
      name: `${contractType} - ${client}`,
      client,
      type: Math.random() > 0.5 ? 'review' : 'draft',
      status,
      lastUpdated: lastUpdated.toISOString(),
      lawyer,
      keyDate: keyDate.toISOString().split('T')[0],
      urgent: isUrgent,
      riskLevel,
      value: Math.floor(Math.random() * 10000000) + 1000000,
      tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
      clientContact: `${lawyer.toLowerCase().replace(' ', '.')}@${client.toLowerCase().replace(' ', '')}.com`,
      estimatedCompletion: new Date(keyDate.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      slaDeadline: new Date(lastUpdated.getTime() + (5 + Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: uploadedDate.toISOString(),
      completedAt: Math.random() > 0.5 ? new Date(lastUpdated.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString() : null,
      slaViolated: Math.random() < 0.1,
      risk: riskLevel
    };
  });
} 