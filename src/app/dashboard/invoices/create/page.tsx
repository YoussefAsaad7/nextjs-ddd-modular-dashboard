import { fetchCustomers } from '@/modules/invoices/application/fetch-customers';
import CreateInvoiceForm from '@/modules/invoices/ui/create-form';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <h1>Create Invoice</h1>
      <CreateInvoiceForm customers={customers} />
    </main>
  );
}
