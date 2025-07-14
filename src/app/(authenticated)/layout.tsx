'use client';

import AuthenticatedLayoutComponent from '@/components/layout/authenticated';
import { AlertProvider } from '@/contexts/alert.context';
import { AuthProvider } from '@/contexts/auth.context';
import { MenuProvider } from '@/contexts/menu.context';
import { withAuth } from '@/hoc/with-auth.hoc';
import TanstackProvider from '@/providers/tanstack.provider';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const WrappedComponent = withAuth(() => <>{children}</>);
  return (
    <AlertProvider>
      <AuthProvider>
        <MenuProvider>
          <TanstackProvider>
            <AuthenticatedLayoutComponent>
              <WrappedComponent />
            </AuthenticatedLayoutComponent>
          </TanstackProvider>
        </MenuProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
