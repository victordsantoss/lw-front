import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres' })
      .trim(),
    email: z
      .string({ required_error: 'O email é obrigatório' })
      .email('Insira um email válido')
      .trim(),
    cpf: z
      .string({ required_error: 'O cpf é obrigatório' })
      .max(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
      .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, 'CPF inválido')
      .trim(),
    password: z
      .string({ required_error: 'A senha é obrigatória' })
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .max(50, { message: 'A senha deve ter no máximo 50 caracteres' }),
    confirmPassword: z.string({ required_error: 'A confirmação de senha é obrigatória' }),
  })
  .refine(
    data => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: 'As senhas não coincidem. Por favor, verifique e tente novamente.',
      path: ['confirmPassword'],
    }
  );

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
