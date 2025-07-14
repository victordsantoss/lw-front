import { ThemeProvider } from '@mui/material/styles';
import '../configs/styles/reset.css';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from '@/configs/styles/theme/default-theme';

export const metadata = {
  title: 'LW - Gestão de Contas',
  description: 'A sua plataforma de gestão de contas bancárias',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
