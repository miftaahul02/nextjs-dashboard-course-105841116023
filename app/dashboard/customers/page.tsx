import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data'; // Impor fungsi untuk mengambil data pelanggan
import CustomersTable from '@/app/ui/customers/table'; // Pastikan file ini ada
import { CustomersTableSkeleton } from '@/app/ui/skeletons'; // Pastikan file ini ada
import Search from '@/app/ui/search'; // Pastikan file ini ada
import { lusitana } from '@/app/ui/fonts'; // Pastikan file ini ada

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}