import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Impor tipe PageProps dari 'next/types'.
// Ini adalah cara yang lebih spesifik untuk mendapatkan definisi tipe Next.js.
import type { PageProps } from 'next';

// Pastikan fungsi Page menerima props dengan tipe PageProps yang diimpor.
// PageProps sudah mencakup params dan searchParams dengan tipe yang benar.
export default function Page({ searchParams, params }: PageProps) {
  // searchParams secara default bisa berupa { [key: string]: string | string[] | undefined }
  // Kita melakukan type assertion atau pengecekan untuk memastikan tipe yang kita inginkan.
  const query = typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

  // Anda juga bisa mengakses params jika rute ini adalah rute dinamis (contoh: /customers/[id])
  // const customerId = typeof params?.id === 'string' ? params.id : undefined;

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
