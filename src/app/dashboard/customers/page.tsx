import { getCustomers } from '@/modules/customers/application/fetch-customers';
import CustomersTable from '@/modules/customers/ui/customers-table';

export default async function Page(props: { searchParams?: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const customers = await getCustomers(query);

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
