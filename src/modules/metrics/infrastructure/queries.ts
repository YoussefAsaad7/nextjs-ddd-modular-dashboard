import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

// Revenue
export async function fetchRevenue() {
  return prisma.revenue.findMany();
}

// Latest invoices
export async function fetchLatestInvoices() {
  const invoices = await prisma.invoice.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    include: { customer: true },
  });

  return invoices.map((invoice) => ({
    id: invoice.id,
    amount: formatCurrency(invoice.amount),
    name: invoice.customer.name,
    email: invoice.customer.email,
    image_url: invoice.customer.image_url,
  }));
}

// Cards data
export async function fetchCardData() {
  const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
    prisma.invoice.count(),
    prisma.customer.count(),
    prisma.invoice.groupBy({
      by: ['status'],
      _sum: { amount: true },
    }),
  ]);

  const paid = invoiceStatus.find((i) => i.status === 'paid')?._sum.amount ?? 0;
  const pending = invoiceStatus.find((i) => i.status === 'pending')?._sum.amount ?? 0;

  return {
    numberOfInvoices: invoiceCount,
    numberOfCustomers: customerCount,
    totalPaidInvoices: formatCurrency(paid),
    totalPendingInvoices: formatCurrency(pending),
  };
}
