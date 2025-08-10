import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Hapus import type { PageProps } from 'next'; atau 'next/types';
// Kita tidak akan menggunakan impor ini karena menyebabkan masalah.

// Definisikan tipe untuk props komponen halaman secara *paling* mandiri.
// Ini mencakup 'params' untuk rute dinamis dan 'searchParams' untuk parameter URL.
// Keduanya bisa berupa string, array of strings, atau undefined.
interface MyPageProps {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Komponen halaman akan menerima props dengan tipe MyPageProps yang kita definisikan.
export default function Page({ searchParams, params }: MyPageProps) {
  // Pastikan penanganan `query` dan `currentPage` tetap aman
  // untuk berjaga-jaga jika searchParams.query/page tidak ada atau bukan string
  const query = typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />
      {/* Menggunakan Suspense untuk menampilkan skeleton saat tabel dimuat */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
