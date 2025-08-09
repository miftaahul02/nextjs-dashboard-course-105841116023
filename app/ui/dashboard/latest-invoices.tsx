import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Update just now</h3>
        </div>
      </div>
    </div>
  );
}

// You can create a new component for the skeleton or just export the same skeleton as before
export function LatestInvoicesSkeleton() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <div className="flex items-center space-x-3 py-4">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-24 rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-12 rounded-md bg-gray-200" />
          </div>
          <div className="flex items-center space-x-3 py-4">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-24 rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-12 rounded-md bg-gray-200" />
          </div>
          <div className="flex items-center space-x-3 py-4">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-24 rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-12 rounded-md bg-gray-200" />
          </div>
          <div className="flex items-center space-x-3 py-4">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-24 rounded-md bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-12 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
