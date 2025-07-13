import { IMenuItem, menuItems } from '@/components/layout/authenticated/items';
import React, { createContext, useContext, useState } from 'react';

interface MenuContextProps {
  current: IMenuItem;
  setCurrent: (current: IMenuItem) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<IMenuItem>(menuItems[0]);

  return (
    <MenuContext.Provider
      value={{
        current,
        setCurrent,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within an MenuProvider');
  }
  return context;
};
