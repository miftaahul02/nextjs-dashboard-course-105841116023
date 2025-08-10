import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages, fetchFilteredInvoices } from '@/app/lib/data'; // Tambahkan fetchFilteredInvoices

export const metadata: Metadata = {
  title: 'Faktur',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Resolusi searchParams karena bertipe Promise
  const resolvedSearchParams = await searchParams;

  // Ambil query dan page dari searchParams dengan default value
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const currentPage = typeof resolvedSearchParams.page === 'string' ? Number(resolvedSearchParams.page) : 1;

  // Validasi page number untuk mencegah NaN atau nilai tidak valid
  const safePage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  // Error handling untuk data fetching
  let totalPages = 1;
  try {
    totalPages = await fetchInvoicesPages(query);
  } catch (error) {
    console.error('Gagal mengambil data halaman faktur:', error);
    return (
      <div className="w-full text-center text-red-500">
        Gagal memuat data faktur. Silakan coba lagi nanti.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Faktur</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari faktur..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={safePage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}