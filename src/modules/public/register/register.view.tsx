import { Box, Typography } from '@mui/material';
import { defaultContainerStyles } from '@/common/utils/styles';
import { authFormStyles } from '../styles';
import RegisterFormViewModel from './components/form';

const title = 'Bem vindo(a) ao nosso sistema';
const subTitle = 'Faça seu cadastro para continuar explorando nossos serviços.';

const RegisterView = () => {
  return (
    <Box sx={{ ...defaultContainerStyles }}>
      <Box sx={{ ...authFormStyles.container, flexDirection: 'column' }}>
        <Box>
          <Typography variant="h3" sx={authFormStyles.form.title}>
            {title}
          </Typography>
          <Typography variant="body2" sx={authFormStyles.form.subTitle}>
            {subTitle}
          </Typography>
        </Box>
        <Box sx={{ ...authFormStyles.form.container }}>
          <RegisterFormViewModel />
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterView;
