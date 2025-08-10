import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredCustomers } from '@/app/lib/data';

// Tentukan metadata untuk halaman ini
export const metadata: Metadata = {
  title: 'Customers',
};

// Ini adalah komponen halaman utama untuk /dashboard/customers
// Component ini menerima searchParams, yang merupakan objek
// yang berisi query string dari URL.
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  // Ambil nilai 'query' dari searchParams. Jika tidak ada, gunakan string kosong.
  const query = searchParams?.query || '';

  // Ambil data pelanggan yang difilter dari database.
  // Karena ini adalah Server Component, kita bisa langsung memanggil
  // fungsi async untuk mengambil data.
  const customers = await fetchFilteredCustomers(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      {/* Menggunakan Suspense untuk menampilkan loading skeleton saat data dimuat */}
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* Meneruskan data pelanggan ke komponen Table */}
        <Table customers={customers} />
      </Suspense>
    </div>
  );
}