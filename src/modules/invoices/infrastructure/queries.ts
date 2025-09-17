import {prisma} from "@/lib/prisma";
import { Invoice } from "../domain/invoice";

// export async function createInvoiceDB(invoice: Omit<Invoice, "id">) {
//   return prisma.invoice.create({ data: invoice });
// }

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
