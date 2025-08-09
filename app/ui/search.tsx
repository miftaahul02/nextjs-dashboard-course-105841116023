'use client'; // Ini adalah Client Component

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // Mengakses parameter URL saat ini
  const pathname = usePathname(); // Mengakses jalur URL saat ini
  const { replace } = useRouter(); // Mengakses fungsi router untuk navigasi

  // Menggunakan useDebouncedCallback untuk menunda pembaruan URL
  // Ini mencegah terlalu banyak request ke server saat pengguna mengetik
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams); // Membuat objek URLSearchParams baru
    params.set('page', '1'); // Reset halaman ke 1 saat melakukan pencarian baru

    if (term) {
      params.set('query', term); // Jika ada term pencarian, set parameter 'query'
    } else {
      params.delete('query'); // Jika term kosong, hapus parameter 'query'
    }
    // Memperbarui URL tanpa memuat ulang halaman
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Tunda selama 300ms

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value); // Panggil handler pencarian saat input berubah
        }}
        // Menentukan nilai awal input dari parameter URL
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
