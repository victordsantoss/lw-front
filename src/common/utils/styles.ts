import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const defaultContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  flex: 1,
};

const formStyles: {
  container: SxProps<Theme>;
  formContainer: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 2, md: 4 },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    py: 2,
    gap: { xs: 1, md: 2 },
  },
  buttonContainer: {
    width: '100%',
    maxWidth: { xs: '100%', md: '300px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 1, md: 2 },
    justifyContent: 'center',
    marginX: 'auto',
  },
};

export { defaultContainerStyles, formStyles };
