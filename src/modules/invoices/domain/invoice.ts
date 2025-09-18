import { z } from 'zod';

export const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(), //{ invalid_type_error: "Please select a customer." }
  amount: z.coerce.number().gt(0, { message: 'Amount must be greater than $0.' }),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

export const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });
export const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export type Invoice = z.infer<typeof InvoiceSchema>;
