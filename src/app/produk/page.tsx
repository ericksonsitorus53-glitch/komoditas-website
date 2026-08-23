import { getProductBlurData } from '@/lib/blur-images';
import ProdukGrid from '@/components/ProdukGrid';

export default async function ProdukPage() {
  const blurData = await getProductBlurData();

  return <ProdukGrid blurData={blurData} />;
}
