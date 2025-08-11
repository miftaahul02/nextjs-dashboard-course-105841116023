import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
// Ini yang harus diubah:
// Mengimpor InvoicesTable, karena itulah nama komponen default dari 'app/ui/invoices/table.tsx'
import InvoicesTable from '@/app/ui/invoices/table';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// Catatan: fetchFilteredInvoices dan fetchInvoicesPages tidak perlu diimpor di sini
// karena InvoicesTable akan memanggil fetchFilteredInvoices.
// Namun, jika Pagination Anda juga merupakan Server Component, Anda bisa memanggil
// fetchInvoicesPages di dalamnya, atau tetap memanggilnya di page ini jika diperlukan.

// Asumsi: Pagination Anda juga diekspor secara default dengan nama InvoicesPagination
import InvoicesPagination from '@/app/ui/invoices/pagination'; // Sesuaikan jika nama defaultnya berbeda

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page() {
  const query = ''; // Kueri default karena tidak menggunakan searchParams
  const currentPage = 1; // Halaman default karena tidak menggunakan searchParams

  // Jika InvoicesPagination memerlukan totalPages, Anda dapat memanggilnya di sini:
  // const totalPages = await fetchInvoicesPages(query);
  // Atau lebih baik, jadikan InvoicesPagination Server Component dan biarkan dia mengambil totalPages sendiri.
  // Untuk contoh ini, kita set nilai default untuk menghindari error.
  const totalPages = 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Faktur</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari faktur..." />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* Gunakan nama komponen yang benar: InvoicesTable */}
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* Gunakan nama komponen yang benar: InvoicesPagination */}
        <InvoicesPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
