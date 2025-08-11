import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table'; // Pastikan ini mengarah ke table faktur
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data'; // Pastikan fungsi pengambilan data faktur
import Pagination from '@/app/ui/invoices/pagination';

export const metadata: Metadata = {
  title: 'Invoices',
};

// --- Hapus deklarasi interface yang terkait searchParams di sini jika ada ---
// Contoh:
// interface InvoicesPageProps {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }
// -------------------------------------------------------------------------

// Modifikasi deklarasi fungsi Page
// Hapus `{ searchParams }: InvoicesPageProps` dari parameter fungsi
export default async function Page() {
  // Atur nilai default karena searchParams tidak digunakan
  const query = '';
  const currentPage = 1;

  // Panggil fungsi pengambilan data faktur
  const invoices = await fetchFilteredInvoices(query, currentPage);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Faktur</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Search dan Pagination akan berfungsi jika mereka mengelola state internal,
            bukan mengandalkan URL params. */}
        <Search placeholder="Cari faktur..." />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table invoices={invoices} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
