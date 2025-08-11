import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table'; // Ini adalah InvoicesTable dari app/ui/invoices/table.tsx
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data'; // Tidak perlu lagi diimpor di sini

export const metadata: Metadata = {
  title: 'Invoices',
};

// Komponen Page tidak lagi menerima props searchParams
export default async function Page() {
  // Karena searchParams tidak digunakan, kita akan mengatur query dan currentPage
  // secara default untuk diteruskan ke komponen Table.
  const query = ''; // Mengatur kueri kosong secara default
  const currentPage = 1; // Mengatur halaman pertama secara default

  // Catatan: Anda tidak lagi perlu memanggil fetchFilteredInvoices dan fetchInvoicesPages di sini,
  // karena komponen Table (InvoicesTable) akan memanggilnya sendiri.
  // Jika Anda masih ingin menggunakan totalPages untuk Pagination, Anda bisa memanggilnya secara terpisah.
  // Untuk contoh ini, kita asumsikan Pagination mungkin tidak sepenuhnya berfungsi tanpa URL params.
  // Atau Anda bisa memindahkan fetchInvoicesPages ke komponen Pagination sendiri,
  // yang juga merupakan Server Component.
  const totalPages = 1; // Atur totalPages ke nilai default jika tidak ada paginasi aktif

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Faktur</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/*
          Komponen Search ini tidak akan lagi memengaruhi URL.
          Jika Anda ingin fungsionalitas pencarian, Anda perlu
          mengelola state pencarian di sisi klien (misalnya dengan useState)
          dan meneruskannya ke komponen Table.
        */}
        <Search placeholder="Cari faktur..." />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {/* Meneruskan prop query dan currentPage yang diharapkan oleh InvoicesTable */}
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/*
          Komponen Pagination ini tidak akan lagi memengaruhi URL.
          totalPages di sini akan statis (misalnya 1) kecuali Anda mendapatkan
          nilai ini dari cara lain (misalnya, memanggil fetchInvoicesPages
          langsung di komponen Pagination atau di sini secara terpisah).
        */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
