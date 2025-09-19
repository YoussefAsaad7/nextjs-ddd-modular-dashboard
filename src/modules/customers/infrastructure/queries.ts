import { prisma } from "@/lib/prisma";

export async function fetchFilteredCustomers(query: string) {
  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      invoices: true,
    },
    orderBy: { name: "asc" },
  });

  return customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    image_url: c.image_url,
    total_invoices: c.invoices.length,
    total_pending: c.invoices
      .filter((i) => i.status === "pending")
      .reduce((sum, i) => sum + i.amount, 0),
    total_paid: c.invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.amount, 0),
  }));
}
