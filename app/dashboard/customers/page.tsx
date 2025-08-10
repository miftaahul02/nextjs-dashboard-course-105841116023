import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // Reuse skeleton, or create a specific CustomersTableSkeleton
import { Suspense } from 'react';
// import { PageProps } from '@/app/lib/definitions'; // TIDAK PERLU IMPORT PAGEPROPS DI SINI LAGI

// Halaman ini adalah Server Component yang akan menerima searchParams dari URL.
// Kita mendefinisikan tipenya langsung di parameter agar lebih spesifik dan menghindari konflik dengan PageProps.
export default async function Page({
  searchParams,
}: { // Definisikan tipe searchParams secara langsung di sini
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // AWAIT searchParams sebelum mengakses propertinya (penting untuk server components)
  const resolvedSearchParams = await searchParams; // Tetap perlu await jika Next.js menganggapnya Promise

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
