import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

// Halaman ini adalah Server Component yang akan menerima searchParams dari URL.
// Kita mendefinisikan tipenya secara langsung di parameter untuk menghindari konflik tipe.
export default async function Page({
  searchParams,
}: { // Definisi tipe langsung di sini
  query?: string;
  page?: string;
}) {
  // Pastikan searchParams selalu objek, bahkan jika Promise-nya kosong atau undefined.
  const resolvedSearchParams = (await searchParams) || {}; 

  const query = resolvedSearchParams.query || '';
  
  let customersToDisplay = []; // Gunakan nama variabel baru untuk kejelasan
  try {
    // Mencoba mengambil data pelanggan
    const fetchedCustomers = await fetchFilteredCustomers(query);
    // fetchFilteredCustomers SUDAH mengembalikan data yang diformat!
    // Pastikan fetchedCustomers adalah array sebelum menetapkannya
    if (fetchedCustomers && Array.isArray(fetchedCustomers)) {
      customersToDisplay = fetchedCustomers;
    } else {
      console.warn('fetchFilteredCustomers did not return an array, got:', fetchedCustomers);
    }
  } catch (error) {
    console.error('Failed to fetch customers in page.tsx:', error);
    // Jika ada error saat fetch, customersToDisplay akan tetap array kosong
  }

  // --- BAGIAN INI SANGAT PENTING ---
  // Baris pemformatan ganda sebelumnya HARUS DIHAPUS atau DIKOMENTARI.
  // Kode di bawah ini TIDAK BOLEH ADA di file Anda:
  // const customers = customersRaw.map((customer) => ({
  //   ...customer,
  //   total_pending: formatCurrency(customer.total_pending),
  //   total_paid: formatCurrency(customer.total_paid),
  // }));
  // --- Akhir BAGIAN SANGAT PENTING ---

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* Perbaikan sintaks di sini: gunakan `${}` yang benar */}
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1> 
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* Meneruskan customersToDisplay yang sudah diformat langsung ke Table */}
        <Table customers={customersToDisplay} />
      </Suspense>
    </div>
  );
}
