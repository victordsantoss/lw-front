import { useRouter } from 'next/navigation';
import { RegisterFormValues, RegisterSchema } from './form.schema';
import { useAlert } from '@/contexts/alert.context';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { wait } from '@/common/utils/wait';

export const useRegisterFormModel = () => {
  const { push } = useRouter();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: RegisterFormValues) => AuthService.register(values),
    onError: error => {
      if (isAxiosError(error)) showAlert(error.response?.data.message, 'error');
    },
    onSuccess: () => {
      showAlert(
        'Usuário registrado com sucesso! Você será redirecionado para a página de login.',
        'success'
      );
      wait(2000).then(() => push('/login'));
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutate(values);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return {
    onSubmit,
    isPending,
    methods,
    push,
    showPassword,
    handleTogglePasswordVisibility,
    showConfirmPassword,
    handleToggleConfirmPasswordVisibility,
  };
};
