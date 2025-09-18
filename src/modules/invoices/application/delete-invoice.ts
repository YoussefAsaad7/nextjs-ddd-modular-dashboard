'use server';

import { deleteInvoiceById } from '../infrastructure/queries';
import { revalidatePath } from 'next/cache';

export async function deleteInvoice(id: string) {
  try {
    await deleteInvoiceById(id);
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete invoice.');
  }
}
