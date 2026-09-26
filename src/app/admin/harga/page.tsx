import type { Metadata } from 'next';
import PriceAdminDashboard from '@/components/admin/PriceAdminDashboard';

export const metadata: Metadata = {
  title: 'Admin — Status Harga',
  robots: { index: false, follow: false },
};

export default function AdminHargaPage() {
  return <PriceAdminDashboard />;
}
