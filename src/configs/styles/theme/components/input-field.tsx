import { ComponentsOverrides, Theme } from '@mui/material';

interface FilledInputOverrides {
  MuiInputBase: {
    styleOverrides: ComponentsOverrides<Theme>['MuiInputBase'];
  };
}

export const TextFieldStyles: FilledInputOverrides = {
  MuiInputBase: {
    styleOverrides: {
      input: {
        color: 'black',
        '&::placeholder': {
          color: 'black',
          opacity: 1,
        },
      },
    },
  },
};
