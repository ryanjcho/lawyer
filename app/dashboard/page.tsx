import { redirect } from 'next/navigation';

export default function DashboardRootRedirect() {
  redirect('/dashboard/overview');
  return null;
}