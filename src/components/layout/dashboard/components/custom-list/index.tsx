import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { IMenuItem, menuItems } from '../../items';
import { alpha, Tooltip } from '@mui/material';
import { customListStyles } from './styles';
import { useMenu } from '@/contexts/menu.context';
import { usePathname, useRouter } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
interface ICustomListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CustomList: React.FC<ICustomListProps> = ({ open, setOpen }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { setCurrent } = useMenu();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleToggleCategory = (category: IMenuItem) => {
    setOpen(true);
    setExpandedCategory(prev => (prev === category.text ? null : category.text));
    if (category.url) {
      push(category.url);
    }
  };

  const handleToggleItem = (item: IMenuItem) => {
    setCurrent(item);
    push(item.url);
  };

  useEffect(() => {
    if (!open) setExpandedCategory(null);
  }, [open]);

  const getActive = (url: string) => {
    return pathname === url;
  };

  const renderArrowIcon = (hasItems: boolean) => {
    if (!hasItems) return null;
    return expandedCategory ? (
      <ArrowDropUpIcon sx={{ color: 'primary.main' }} />
    ) : (
      <ArrowDropDownIcon sx={{ color: 'primary.main' }} />
    );
  };

  return (
    <List>
      {menuItems.map((category: IMenuItem) => {
        const hasActiveItem = category.items?.some(item => item.url === pathname);
        return (
          <div key={category.text}>
            <ListItem disablePadding sx={customListStyles.listItem}>
              <ListItemButton
                onClick={() => handleToggleCategory(category)}
                sx={{
                  ...customListStyles.listItemButton(open),
                  bgcolor: theme =>
                    hasActiveItem && !expandedCategory
                      ? alpha(theme.palette.primary.contrastText, 1)
                      : 'transparent',
                  '&:hover': {
                    backgroundColor: theme => alpha(theme.palette.primary.contrastText, 0.2),
                  },
                }}
              >
                <Tooltip title={`${category.text}`} placement="right">
                  <ListItemIcon sx={customListStyles.listItemIcon(open)}>
                    {category.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary={category.text} sx={customListStyles.listItemText(open)} />
                {renderArrowIcon(!!category.items?.length)}
              </ListItemButton>
            </ListItem>
            <Collapse in={expandedCategory === category.text} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category?.items?.map((item, index) => (
                  <ListItem
                    key={`${item.text}-${index}`}
                    disablePadding
                    sx={{
                      ...customListStyles.listItem,
                      bgcolor: theme =>
                        getActive(item.url)
                          ? alpha(theme.palette.primary.contrastText, 1)
                          : 'transparent',
                      '&:hover': {
                        backgroundColor: theme => alpha(theme.palette.primary.contrastText, 0.2),
                      },
                    }}
                    onClick={() => handleToggleItem(item)}
                  >
                    <ListItemButton sx={customListStyles.nestedListItemButton(open)}>
                      <ListItemText primary={item.text} sx={customListStyles.listItemText(open)} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default CustomList;
