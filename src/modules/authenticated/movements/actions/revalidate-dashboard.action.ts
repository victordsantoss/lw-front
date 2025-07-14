'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateMovementsDashboard() {
  revalidateTag('movement-dashboard');
}
