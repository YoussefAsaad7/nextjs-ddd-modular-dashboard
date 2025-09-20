import { prisma } from '@/lib/prisma';

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

  return customers.map((c) => {
    const total_pending_cents = c.invoices
      .filter((i) => i.status === "pending")
      .reduce((sum, i) => sum + i.amount, 0);

    const total_paid_cents = c.invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.amount, 0);

    return {
      id: c.id,
      name: c.name,
      email: c.email,
      image_url: c.image_url,
      total_invoices: c.invoices.length,
      total_pending: total_pending_cents / 100, // ✅ convert back from cents
      total_paid: total_paid_cents / 100,       // ✅ convert back from cents
    };
  });
}
