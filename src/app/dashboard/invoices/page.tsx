import InvoicesPage from '@/modules/invoices/ui/invoices-page';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  // Await searchParams properly
  const params = await searchParams;

  const query = params?.query ?? '';
  const page = Number(params?.page ?? '1');

  return <InvoicesPage query={query} currentPage={page} />;
}
