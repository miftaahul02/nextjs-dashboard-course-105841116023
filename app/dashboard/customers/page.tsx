import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import type { FormattedCustomersTable } from '@/app/lib/definitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';

  let customersToDisplay: FormattedCustomersTable[] = [];
  try {
    const fetchedCustomers = await fetchFilteredCustomers(query);

    if (Array.isArray(fetchedCustomers)) {
      customersToDisplay = fetchedCustomers;
    } else {
      console.warn('fetchFilteredCustomers did not return an array:', fetchedCustomers);
    }
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table customers={customersToDisplay} />
      </Suspense>
    </div>
  );
}
