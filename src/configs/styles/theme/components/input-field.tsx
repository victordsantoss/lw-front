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
        color: 'black', // Garante que o texto digitado fique preto
        '&::placeholder': {
          color: 'black',
          opacity: 1, // Garante visibilidade do placeholder
        },
      },
    },
  },
};
