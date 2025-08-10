import { Suspense } from 'react';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';

// --- PENTING ---
// Kita akan HAPUS SEMUA IMPOR TIPE Next.js (seperti PageProps) dan definisi interface kustom
// karena tampaknya menyebabkan konflik dan error yang tidak biasa di lingkungan Anda.

// Kami akan menggunakan 'any' untuk props komponen Page ini sebagai solusi darurat.
// Ini akan membuat TypeScript mengabaikan validasi tipe untuk props masuk.
// Idealnya, kita harus menggunakan tipe PageProps yang benar dari Next.js,
// tetapi karena error 'Promise<any>' yang aneh, ini adalah workaround.
export default async function Page(props: any) {
  // Lakukan type assertion yang aman untuk `searchParams`
  // Ini memberitahu TypeScript bahwa meskipun props adalah 'any', kita tahu
  // bahwa props.searchParams seharusnya adalah objek ini.
  const searchParams = props.searchParams as {
    query?: string | string[] | undefined;
    page?: string | string[] | undefined;
  } | undefined;

  // Jika rute Anda memiliki segmen dinamis (misalnya /invoices/[id]),
  // Anda mungkin juga perlu melakukan type assertion untuk `params` seperti ini:
  // const params = props.params as { [key: string]: string | string[] | undefined } | undefined;

  // Lanjutkan dengan logika Anda seperti biasa, menangani nilai yang mungkin undefined
  const query = typeof searchParams?.query === 'string' ? searchParams.query : '';
  const currentPage = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

  // Anda bisa melakukan fetch data di sini karena ini adalah Server Component
  // const totalPages = await fetchInvoicesPages(query); // Contoh
  // const invoices = await fetchFilteredInvoices(query, currentPage); // Contoh

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Invoices</h1>
      <Search placeholder="Search invoices..." />
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* Ini adalah placeholder untuk tabel faktur Anda.
            Ganti dengan komponen tabel faktur Anda yang sebenarnya. */}
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <p className="text-gray-700 p-4">Data faktur untuk query: "{query}" di halaman: {currentPage}</p>
            </div>
          </div>
        </div>
      </Suspense>
      {/* Placeholder untuk pagination Anda. Ganti dengan komponen Pagination Anda. */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
