export type CustomerField = {
  id: string;
  name: string;
};
export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};
