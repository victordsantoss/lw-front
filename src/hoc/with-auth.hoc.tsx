'use client';

import { AuthCookie } from '@/storages/cookies/auth.cookies';
import { AuthStorage } from '@/storages/local/auth.storage';
import { UserStorage } from '@/storages/local/user.storage';
import { useRouter } from 'next/navigation';
import { FC, ComponentType, useEffect } from 'react';

export function withAuth<T extends Record<string, unknown>>(Component: ComponentType<T>): FC<T> {
  const checkActiveSession = async (token: string | null): Promise<boolean> => {
    if (!token) return false;
    return true;
  };

  return function WithAuth(props: T) {
    const router = useRouter();

    useEffect(() => {
      const validateSession = async () => {
        const token = AuthStorage.getToken();
        if (!token) {
          UserStorage.removeUser();
          AuthStorage.removeToken();
          AuthCookie.remove();
          router.push('/login');
          return;
        }

        const isValidSession = await checkActiveSession(token);
        if (!isValidSession) {
          router.push('/login');
        }
      };

      validateSession();
    }, [router]);

    return <Component {...props} />;
  };
}
