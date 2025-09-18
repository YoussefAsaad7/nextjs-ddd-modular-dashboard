import { prisma } from '@/lib/prisma';
import { Invoice } from '../domain/invoice';
import { CustomerField, InvoiceForm } from '../domain/types';

export async function createInvoiceDB({
  customer_id,
  amount,
  status,
}: {
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
}) {
  return prisma.invoice.create({
    data: {
      customer_id,
      amount,
      status,
      date: new Date().toISOString(),
    },
  });
}
export async function updateInvoiceDB(id: string, invoice: Partial<Invoice>) {
  return prisma.invoice.update({ where: { id }, data: invoice });
}

export async function deleteInvoiceDB(id: string) {
  return prisma.invoice.delete({ where: { id } });
}

export async function listInvoicesDB(query: string, page: number, limit: number) {
  return prisma.invoice.findMany({
    where: {
      OR: query
        ? [
            { customer: { name: { contains: query, mode: 'insensitive' } } },
            { status: { contains: query, mode: 'insensitive' } },
          ]
        : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
    include: { customer: true },
    orderBy: { date: 'desc' },
  });
}

export async function countInvoicesPagesDB(query: string, limit = 6) {
  const count = await prisma.invoice.count({
    where: query
      ? {
          OR: [
            { customer: { name: { contains: query, mode: 'insensitive' } } },
            { status: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
  });

  return Math.ceil(count / limit);
}

export async function getAllCustomers(): Promise<CustomerField[]> {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function getInvoiceById(id: string): Promise<InvoiceForm | null> {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    select: {
      id: true,
      customer_id: true,
      amount: true,
      status: true,
    },
  });

  if (!invoice) return null;

  return {
    ...invoice,
    status: invoice.status as 'pending' | 'paid',
    amount: invoice.amount / 100, // convert cents to dollars
  };
}

export async function updateInvoiceById(
  id: string,
  data: { customer_id: string; amount: number; status: 'pending' | 'paid' },
) {
  return await prisma.invoice.update({
    where: { id },
    data: {
      customer_id: data.customer_id,
      amount: Math.round(data.amount * 100),
      status: data.status,
    },
  });
}

export async function deleteInvoiceById(id: string) {
  try {
    await prisma.invoice.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Failed to delete invoice:', error);
    throw new Error('Failed to delete invoice.');
  }
}
