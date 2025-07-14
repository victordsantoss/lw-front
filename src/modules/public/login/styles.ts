import { SxProps, Theme } from '@mui/material';
import defaultTheme from '@/configs/styles/theme/default-theme';

export const loginFormStyles: {
  sections: Record<'form', SxProps<Theme>>;
} = {
  sections: {
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 1, md: 2 },
      [defaultTheme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  },
};
