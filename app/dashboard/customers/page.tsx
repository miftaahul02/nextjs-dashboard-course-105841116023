import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Hapus import type { PageProps} from 'next'; karena bermasalah.

// Definisikan tipe untuk props halaman secara manual.
// Ini adalah struktur umum yang diterima oleh komponen halaman di Next.js App Router.
interface PageComponentProps {
  params?: { [key: string]: string | string[] | undefined }; // Untuk dynamic routes, contoh: /customers/[id]
  searchParams?: { [key: string]: string | string[] | undefined }; // Untuk query params, contoh: /customers?query=abc&page=1
}

// Halaman ini adalah Server Component yang akan menerima searchParams dari URL.
// Kita akan menggunakan tipe PageComponentProps yang kita definisikan sendiri.
export default function Page({ searchParams }: PageComponentProps) {
  // Pastikan untuk menangani searchParams yang mungkin undefined atau berupa array
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
