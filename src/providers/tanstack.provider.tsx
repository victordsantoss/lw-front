'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ReactNode } from 'react';

const TanstackProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  const open = false;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {open && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
