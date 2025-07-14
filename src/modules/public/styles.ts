import { SxProps, Theme } from '@mui/material';
import defaultTheme from '@/configs/styles/theme/default-theme';

export const authFormStyles: {
  container: SxProps<Theme>;
  form: Record<'title' | 'subTitle' | 'container' | 'action', SxProps<Theme>>;
  divider: Record<'section' | 'icon', SxProps<Theme>>;
} = {
  container: {
    backgroundColor: defaultTheme.palette.background.default,
    padding: 4,
    borderRadius: 2,
    width: { xs: '100%', md: '600px' },
    height: 'auto',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
  },

  form: {
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: defaultTheme.palette.primary.main,
    },
    subTitle: {
      textAlign: 'center',
      color: defaultTheme.palette.primary.main,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 1, md: 2 },
    },
    action: {
      color: 'primary.main',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  divider: {
    section: {
      [defaultTheme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    icon: {
      color: defaultTheme.palette.primary.main,
      fontSize: 32,
    },
  },
};
