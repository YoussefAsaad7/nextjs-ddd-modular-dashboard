"use server";

import { updateInvoiceById } from "../infrastructure/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: { customerId?: string[]; amount?: string[]; status?: string[] };
  message?: string | null;
};

export async function updateInvoice(    
  id: string,
  prevState: State,
  formData: FormData,
) {
  const customerId = formData.get("customerId") as string;
  const amount = Number(formData.get("amount"));
  const status = formData.get("status") as "pending" | "paid";

  const errors: State["errors"] = {};
  if (!customerId) errors.customerId = ["Customer is required."];
  if (!amount || amount <= 0)
    errors.amount = ["Amount must be greater than $0."];
  if (!status) errors.status = ["Status is required."];

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Validation failed." };
  }

  try {
    await updateInvoiceById(id, { customer_id: customerId, amount, status });
  } catch (error) {
    console.error(error);
    return { message: "Failed to update invoice.", errors: {} };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
