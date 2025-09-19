"use server";

import { fetchFilteredCustomers } from "../infrastructure/queries";

export async function getCustomers(query: string) {
  return fetchFilteredCustomers(query);
}
