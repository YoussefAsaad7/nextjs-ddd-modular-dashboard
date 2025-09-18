import {prisma} from "@/lib/prisma";
import { Invoice } from "../domain/invoice";
import { CustomerField } from '../domain/types';

export async function createInvoiceDB({
  customer_id,
  amount,
  status,
}: {
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
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
            { customer: { name: { contains: query, mode: "insensitive" } } },
            { status: { contains: query, mode: "insensitive" } },
          ]
        : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
    include: { customer: true },
    orderBy: { date: "desc" },
  });
}

export async function countInvoicesPagesDB(query: string, limit = 6) {
  const count = await prisma.invoice.count({
    where: query
      ? {
          OR: [
            { customer: { name: { contains: query, mode: "insensitive" } } },
            { status: { contains: query, mode: "insensitive" } },
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