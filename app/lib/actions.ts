'use server'; // PENTING: Directive ini harus ada di baris paling atas

import { z } from 'zod'; // Mengimpor pustaka Zod untuk validasi
import { sql } from '@vercel/postgres'; // Mengimpor client SQL untuk interaksi database
import { revalidatePath } from 'next/cache'; // Untuk memvalidasi ulang cache path
import { redirect } from 'next/navigation'; // Untuk mengarahkan pengguna

// Mendefinisikan skema validasi untuk data faktur menggunakan Zod
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.', // Pesan error jika customer tidak dipilih
  }),
  amount: z.coerce // Mengkonversi ke tipe angka
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }), // Memastikan jumlah lebih dari 0
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.', // Pesan error jika status tidak dipilih
  }),
  date: z.string(),
});

// Skema untuk membuat faktur baru (tidak termasuk 'id' dan 'date' karena dibuat secara otomatis)
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// Skema untuk memperbarui faktur (tidak termasuk 'date')
const UpdateInvoice = InvoiceSchema.omit({ date: true });

// Mendefinisikan tipe untuk state formulir (digunakan nanti untuk penanganan error formulir)
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// Server Action untuk membuat faktur baru
export async function createInvoice(prevState: State, formData: FormData) {
  // Memvalidasi data formulir menggunakan skema CreateInvoice
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // Jika validasi gagal, kembalikan kesalahan
  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Ekstrak data yang sudah divalidasi
  const { customerId, amount, status } = validatedFields.data;
  // Konversi jumlah dari dolar ke sen (untuk penyimpanan di database)
  const amountInCents = amount * 100;
  // Dapatkan tanggal saat ini
  const date = new Date().toISOString().split('T')[0];

  try {
    // Masukkan data faktur baru ke database
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // Tangani kesalahan database
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate cache untuk path faktur untuk menampilkan data terbaru
  revalidatePath('/dashboard/invoices');
  // Arahkan pengguna kembali ke halaman faktur
  redirect('/dashboard/invoices');
}

// Server Action untuk memperbarui faktur yang sudah ada
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Server Action untuk menghapus faktur
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices'); // Revalidate cache setelah penghapusan
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}
