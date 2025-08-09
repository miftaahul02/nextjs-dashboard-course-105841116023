import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // Re-use skeleton, or create a specific CustomersTableSkeleton
import { Suspense } from 'react';

// Next.js akan secara otomatis meneruskan searchParams ke Page Component.
// Kita definisikan tipenya langsung di sini agar tidak ada ambiguitas.
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />
      {/* Menggunakan Suspense untuk menampilkan skeleton saat tabel dimuat */}
      {/* Key diubah untuk memaksa React me-render ulang saat query atau currentPage berubah */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      {/* Catatan: Pagination untuk pelanggan akan ditambahkan di chapter selanjutnya, jika diperlukan. */}
    </div>
  );
}
