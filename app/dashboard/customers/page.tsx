import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

// Coba impor NextPageProps secara eksplisit dari 'next'
// Ini adalah cara standar yang seharusnya bekerja di sebagian besar setup Next.js.
import type { MetadataRoute } from 'next'; // Menggunakan MetadataRoute sebagai fallback atau referensi

// Atau, jika NextPageProps masih merah, kita bisa definisikan secara manual
// const Page = ({ searchParams }: { searchParams?: { query?: string | string[]; page?: string | string[]; }; }) => {

// Untuk Page Component, `searchParams` secara default adalah string atau array of string.
// Kita bisa menggunakan cara ini jika `NextPageProps` masih bermasalah.
interface CustomerPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default function Page({ searchParams }: CustomerPageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
