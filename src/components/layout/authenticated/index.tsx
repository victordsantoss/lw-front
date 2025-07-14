'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import CustomList from './components/custom-list';
import { Tooltip } from '@mui/material';
import { AuthService } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useAlert } from '@/contexts/alert.context';
import { UserStorage } from '@/storages/local/user.storage';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth.context';
import { miniDrawerStyles } from './styles';
import { useMenu } from '@/contexts/menu.context';
import { AuthCookie } from '@/storages/cookies/auth.cookies';
import { AuthStorage } from '@/storages/local/auth.storage';

const drawerWidth = 240;

export default function MiniDrawer({ children }: { children: React.ReactNode }) {
  const { current } = useMenu();
  const { push } = useRouter();
  const theme = useTheme();
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getFirstAndLastName = (fullName: string): string => {
    const [firstName = '', ...rest] = fullName.trim().split(' ');
    const lastName = rest.pop() || '';
    return `${firstName} ${lastName}`;
  };

  const { mutate } = useMutation<boolean, Error, void>({
    mutationFn: () => AuthService.logout(),
    onError: error => {
      if (isAxiosError(error)) {
        showAlert(error.response?.data.message, 'error');
      }
    },
    onSuccess: () => {
      showAlert('Encerrando sessão. Até breve!', 'success');
      UserStorage.removeUser();
      AuthStorage.removeToken();
      AuthCookie.remove();
      push('/');
    },
  });

  return (
    <Box sx={miniDrawerStyles.root}>
      <CssBaseline />
      <AppBar open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          {open && (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{ mr: 1 }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={miniDrawerStyles.menuButton(open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {current.text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
        <Box sx={miniDrawerStyles.drawerHeader(theme)}>
          <Box sx={miniDrawerStyles.userInfoContainer}>
            <AccountCircleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {user && getFirstAndLastName(user.user.name)}
              </Typography>
              <Typography fontSize={10}>{user?.user.email}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <CustomList open={open} setOpen={setOpen} />
        <Divider />
        <Tooltip title={`${!open ? 'Sair' : ''}`} placement="right">
          <Box component="button" onClick={() => mutate()} sx={miniDrawerStyles.logoutButton(open)}>
            <Typography sx={miniDrawerStyles.logoutText(open)}>Sair</Typography>
            <LogoutIcon />
          </Box>
        </Tooltip>
      </Drawer>
      <Box component="main" sx={miniDrawerStyles.main}>
        <Box sx={miniDrawerStyles.drawerHeader(theme)} />
        {children}
      </Box>
    </Box>
  );
}
