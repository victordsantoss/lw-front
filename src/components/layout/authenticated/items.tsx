import { JSX } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export interface IMenuItem {
  text: string;
  icon?: JSX.Element;
  url: string;
  items?: IMenuItem[];
}

export const menuItems: IMenuItem[] = [
  {
    text: 'Dashboard',
    icon: <AutoGraphIcon />,
    url: '/home',
  },
  {
    text: 'Movimentações',
    icon: <InventoryIcon />,
    url: '/movements',
  },
];
