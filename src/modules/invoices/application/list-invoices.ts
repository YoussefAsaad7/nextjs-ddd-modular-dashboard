import { listInvoicesDB, countInvoicesPagesDB } from '../infrastructure/queries';

export async function listInvoices(query: string, page: number, limit = 6) {
  const invoices = await listInvoicesDB(query, page, limit);

  // Map Prisma result into UI-friendly structure if needed
  return invoices.map((invoice) => ({
    id: invoice.id,
    name: invoice.customer.name,
    email: invoice.customer.email,
    amount: invoice.amount,
    date: invoice.date,
    status: invoice.status,
    image_url: invoice.customer.image_url,
  }));
}

export async function countInvoicesPages(query: string, limit = 6) {
  return countInvoicesPagesDB(query, limit);
}
