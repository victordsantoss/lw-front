'use client';

import PublicLayoutComponent from '@/components/layout/public';
import { AlertProvider } from '@/contexts/alert.context';
import { AuthProvider } from '@/contexts/auth.context';
import TanstackProvider from '@/providers/tanstack.provider';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <AuthProvider>
        <TanstackProvider>
          <PublicLayoutComponent>{children}</PublicLayoutComponent>
        </TanstackProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
