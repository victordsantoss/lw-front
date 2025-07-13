import { SxProps, Theme } from '@mui/material';
import defaultTheme from '@/configs/styles/theme/default-theme';

export const authLayoutStyle: {
  container: SxProps<Theme>;
  main: SxProps<Theme>;
} = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultTheme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
  },
  main: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
  },
};
