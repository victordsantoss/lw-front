import { ComponentsOverrides, Theme } from '@mui/material';
import defaultTheme from '../default-theme';

interface MyButtonOverrides {
  MuiButton: {
    styleOverrides: ComponentsOverrides<Theme>['MuiButton'];
  };
}

export const ButtonStyles: MyButtonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        fontWeight: 600,
        padding: '8px 16px',

        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'secondary' && {
            backgroundColor: defaultTheme.palette.secondary.main,
            color: defaultTheme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: defaultTheme.palette.secondary.dark,
            },
          }),
      }),
    },
  },
};
