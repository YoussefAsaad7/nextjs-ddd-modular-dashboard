// app/dashboard/invoices/[id]/edit/page.tsx
import { Metadata } from 'next';
// import Breadcrumbs from '@/modules/invoices/ui/breadcrumbs';
import EditInvoiceForm from '@/modules/invoices/ui/edit-form';
import { fetchInvoiceById } from '@/modules/invoices/application/fetch-invoice-by-id';
import { fetchCustomers } from '@/modules/invoices/application/fetch-customers';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  // Fetch invoice and customers in parallel
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
        ]}
      /> */}
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
