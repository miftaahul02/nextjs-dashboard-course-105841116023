import Search from '@/app/ui/search'; // Menggunakan kembali komponen Search
import CustomersTable from '@/app/ui/customers/table'; // Mengimpor tabel pelanggan yang baru dibuat
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // Reuse skeleton jika belum ada customer skeleton
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || ''; // Ambil query dari URL
  const currentPage = Number(searchParams?.page) || 1; // Ambil currentPage dari URL (untuk pagination nanti)

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." /> {/* Bilah pencarian untuk pelanggan */}
      {/* Menggunakan Suspense untuk menampilkan skeleton saat tabel dimuat */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      {/* Catatan: Pagination untuk pelanggan akan ditambahkan di chapter selanjutnya, jika diperlukan. */}
    </div>
  );
}
