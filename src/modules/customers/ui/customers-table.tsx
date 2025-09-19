import Image from 'next/image';
import Search from '@/components/ui/search'; // reuse your Search
import { lusitana } from '@/lib/fonts';
import { CustomerRow } from '../domain/types';

export default function CustomersTable({ customers }: { customers: CustomerRow[] }) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />

      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              {/* Mobile */}
              <div className="md:hidden">
                {customers.map((customer) => (
                  <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <p>{customer.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <div className="flex justify-between border-b py-5">
                      <div>
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">${customer.total_pending}</p>
                      </div>
                      <div>
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">${customer.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop */}
              <table className="hidden min-w-full text-sm md:table">
                <thead>
                  <tr>
                    <th className="px-4 py-5 text-left font-medium">Name</th>
                    <th className="px-3 py-5 text-left font-medium">Email</th>
                    <th className="px-3 py-5 text-left font-medium">Total Invoices</th>
                    <th className="px-3 py-5 text-left font-medium">Total Pending</th>
                    <th className="px-4 py-5 text-left font-medium">Total Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="whitespace-nowrap px-4 py-5">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-5">{customer.email}</td>
                      <td className="whitespace-nowrap px-4 py-5">{customer.total_invoices}</td>
                      <td className="whitespace-nowrap px-4 py-5">${customer.total_pending}</td>
                      <td className="whitespace-nowrap px-4 py-5">${customer.total_paid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
