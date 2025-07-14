import { SxProps, Theme } from '@mui/material';

export const miniDrawerStyles: {
  root: SxProps<Theme>;
  menuButton: (open: boolean) => SxProps<Theme>;
  drawerHeader: (theme: Theme) => SxProps<Theme>;
  userInfoContainer: SxProps<Theme>;
  logoutButton: (open: boolean) => SxProps<Theme>;
  logoutText: (open: boolean) => SxProps<Theme>;
  main: SxProps<Theme>;
} = {
  root: {
    display: 'flex',
  },

  menuButton: (open: boolean) => ({
    marginRight: 5,
    display: open ? 'none' : 'block',
  }),

  drawerHeader: (theme: Theme) => ({
    color: theme.palette.primary.main,
    pl: 2.5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.mixins.toolbar,
  }),

  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 1,
  },

  logoutButton: (open: boolean) => theme => ({
    color: theme.palette.secondary.main,
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: open ? '95%' : '80%',
    display: 'flex',
    justifyContent: open ? 'flex-start' : 'center',
    alignItems: 'center',
    paddingX: 2,
    paddingY: 1,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
  }),

  logoutText: (open: boolean) => ({
    marginLeft: 1,
    display: open ? 'flex' : 'none',
    justifyContent: 'end',
    mr: 'auto',
    fontWeight: 600,
  }),

  main: {
    flexGrow: 1,
    mt: { xs: 1, md: 0 },
    p: { xs: 1.5, md: 3 },
  },
};
