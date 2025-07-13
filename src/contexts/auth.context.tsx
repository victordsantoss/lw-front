import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { AuthStorage } from '@/storages/local/auth.storage';
import { UserService } from '@/services/user';
import { UserStorage } from '@/storages/local/user.storage';
import { User } from '@/services/user/user.types';

interface AuthContextProps {
  persistUser: (token: string) => void;
  user: User.IAuthenticatedUserResponse | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User.IAuthenticatedUserResponse | undefined>(undefined);

  const persistUser = async () => {
    const user = await UserService.getAuthenticatedUser();
    if (user) {
      UserStorage.setUser(user);
      setUser(user);
    }
  };

  const verifyAuth = () => {
    const token = AuthStorage.getToken();
    const localUser = UserStorage.getUser();
    if (token && localUser) {
      setUser(localUser);
    } else {
      AuthStorage.removeToken();
      UserStorage.removeUser();
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return <AuthContext.Provider value={{ persistUser, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
