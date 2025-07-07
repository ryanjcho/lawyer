export const contracts = [
  {
    id: 'C-001',
    type: 'review',
    client: 'Acme Corp',
    lawyer: 'Jane Smith',
    status: 'overdue',
    risk: 'high',
    createdAt: '2024-06-01',
    completedAt: '2024-06-10',
    value: 1000000,
    slaViolated: true,
  },
  {
    id: 'C-002',
    type: 'draft',
    client: 'Beta LLC',
    lawyer: 'John Doe',
    status: 'complete',
    risk: 'low',
    createdAt: '2024-06-05',
    completedAt: '2024-06-12',
    value: 2000000,
    slaViolated: false,
  },
  // ...more mock contracts
]; 