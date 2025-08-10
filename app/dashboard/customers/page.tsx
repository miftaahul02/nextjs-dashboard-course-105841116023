import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // Reuse skeleton, or create a specific CustomersTableSkeleton
import { Suspense } from 'react';
import { PageProps } from '@/app/lib/definitions'; // PENTING: IMPOR PAGEPROPS DARI DEFINITIONS.TS

// Halaman ini adalah Server Component yang akan menerima searchParams dari URL.
// Kita menggunakan PageProps yang diimpor untuk mendefinisikan tipenya agar type safety terjaga.
export default async function Page({
  searchParams,
}: PageProps) {
  // AWAIT searchParams sebelum mengakses propertinya
  const resolvedSearchParams = await searchParams; // Tambahkan await di sini!

  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;

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
