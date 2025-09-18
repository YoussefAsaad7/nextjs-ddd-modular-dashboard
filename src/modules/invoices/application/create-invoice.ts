'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createInvoiceDB } from '../infrastructure/queries';

export type CreateInvoiceState = {
  message: string | null;
  errors: Record<string, string[]>;
};

export async function createInvoice(
  prevState: CreateInvoiceState,
  formData: FormData,
): Promise<CreateInvoiceState> {
  try {
    const customerId = formData.get('customerId')?.toString() ?? '';
    const amount = parseFloat(formData.get('amount') as string);
    const status = formData.get('status') as 'pending' | 'paid';

    if (!customerId || isNaN(amount) || !status) {
      return { message: 'Invalid input', errors: {} };
    }

    await createInvoiceDB({ customer_id: customerId, amount, status });
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create invoice', errors: {} };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
