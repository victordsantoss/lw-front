'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateAccountsDashboard() {
  revalidateTag('account-dashboard');
}
