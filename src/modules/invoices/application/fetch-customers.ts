import { getAllCustomers } from '../infrastructure/queries';
import { CustomerField } from '../domain/types';

export async function fetchCustomers(): Promise<CustomerField[]> {
  return getAllCustomers();
}
