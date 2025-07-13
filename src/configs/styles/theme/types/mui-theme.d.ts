import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    auxiliaryColors: {
      blue: string;
    };
  }

  interface PaletteOptions {
    auxiliaryColors: {
      blue: string;
    };
  }
}
