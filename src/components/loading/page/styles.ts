import { SxProps, Theme } from '@mui/material';
import defaultTheme from '@/configs/styles/theme/default-theme';

export const containerStyles: {
  container: SxProps<Theme>;
} = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultTheme.palette.primary.main,
    height: '100vh',
  },
};
