'use client';
import { createTheme } from '@mui/material/styles';
import { ButtonStyles } from './components/button';
import { TypographyStyles } from './components/typography';
import { TextFieldStyles } from './components/input-field';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#111',
      contrastText: '#EAEAEA',
    },
    secondary: {
      main: '#F66E13',
      contrastText: '#111',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#333',
    },
    background: {
      default: '#EAEAEA',
      paper: '#FFFFFF',
    },
    auxiliaryColors: {
      blue: '#A6DDE6',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    ...TextFieldStyles,
    ...ButtonStyles,
    ...TypographyStyles,
  },
});

export default defaultTheme;
