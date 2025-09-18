import { getInvoiceById as fetchInvoiceByIdQuery } from '../infrastructure/queries';
import { InvoiceForm } from '../domain/types';

export async function fetchInvoiceById(id: string): Promise<InvoiceForm | null> {
  return await fetchInvoiceByIdQuery(id);
}
