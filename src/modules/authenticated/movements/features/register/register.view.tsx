import { Box } from '@mui/material';
import RegisterMovementFormViewModel from './components/form';

export const RegisterMovementView = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <RegisterMovementFormViewModel />
    </Box>
  );
}; 