'use client'; // Pastikan ini adalah Client Component karena menggunakan useFormState

import { useFormState } from 'react-dom';
import { createInvoice } from '@/app/lib/actions'; // Asumsi createInvoice diimpor dari sini
import { CustomerField } from '@/app/lib/definitions'; // Asumsi definisi tipe untuk customers
import { Button } from '@/app/ui/button'; // Asumsi komponen Button

// Definisikan tipe State untuk useFormState
type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// State awal untuk useFormState
const initialState: State = { message: null, errors: {} };

export default function CreateForm({ customers }: { customers: CustomerField[] }) {
  // Gunakan useFormState untuk mengelola state form dan Server Action
  const [state, dispatch] = useFormState(createInvoice, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Pilih pelanggan
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Pilih pelanggan
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          {state.errors?.customerId && (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.customerId.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Masukkan jumlah
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Masukkan jumlah dalam USD"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="amount-error"
            />
          </div>
          {state.errors?.amount && (
            <div id="amount-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.amount.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Invoice Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Pilih status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="status-error"
            >
              <option value="" disabled>
                Pilih status
              </option>
              <option value="pending">Pending</option>
              <option value="paid">Lunas</option>
            </select>
          </div>
          {state.errors?.status && (
            <div id="status-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {state.message && (
          <div aria-live="polite" className="mt-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Buat Faktur</Button>
      </div>
    </form>
  );
}