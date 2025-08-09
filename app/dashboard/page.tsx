// app/dashboard/page.tsx
import { Card } from '@/app/ui/dashboard/cards'; // Pastikan Card diekspor dari cards.tsx
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// Impor fungsi-fungsi pengambilan data Anda
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { Suspense } from 'react'; // Impor Suspense dari React
// Impor komponen skeleton yang baru Anda buat
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  // Panggil semua fungsi pengambilan data secara paralel menggunakan Promise.all
  // Next.js akan membiarkan UI merender sementara data ini diambil di server
  const [
    revenue,
    latestInvoices,
    cardData,
  ] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  // Ekstrak data yang diperlukan untuk kartu
  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Menggunakan Suspense untuk CardWrapper */}
        {/* Saat data untuk kartu sedang diambil, CardsSkeleton akan ditampilkan */}
        <Suspense fallback={<CardsSkeleton />}>
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
          <Card title="Total Customers" value={numberOfCustomers} type="customers" />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Menggunakan Suspense untuk RevenueChart */}
        {/* Saat data untuk grafik pendapatan sedang diambil, RevenueChartSkeleton akan ditampilkan */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        {/* Menggunakan Suspense untuk LatestInvoices */}
        {/* Saat data untuk faktur terbaru sedang diambil, LatestInvoicesSkeleton akan ditampilkan */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>
    </main>
  );
}
