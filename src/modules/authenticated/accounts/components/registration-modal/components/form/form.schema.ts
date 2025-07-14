import { z } from 'zod';
import { AccountType } from '@/common/enums/account.enum';

const RegistrationAccountSchema = z.object({
  name: z.string().optional(),
  accountNumber: z
    .string({ required_error: 'O número da conta é obrigatório' })
    .min(3, 'O número da conta deve ter pelo menos 3 caracteres')
    .max(255, 'O número da conta deve ter no máximo 255 caracteres'),
  agency: z
    .string({ required_error: 'A agência é obrigatória' })
    .min(3, 'A agência deve ter pelo menos 3 caracteres')
    .max(50, 'A agência deve ter no máximo 50 caracteres'),
  accountType: z.nativeEnum(AccountType, {
    required_error: 'O tipo de conta é obrigatório',
    invalid_type_error: 'Tipo de conta inválido',
  }),
  bankName: z
    .string({ required_error: 'O nome do banco é obrigatório' })
    .min(3, 'O nome do banco deve ter pelo menos 3 caracteres')
    .max(255, 'O nome do banco deve ter no máximo 255 caracteres'),
  bankCode: z
    .string({ required_error: 'O código do banco é obrigatório' })
    .min(3, 'O código do banco deve ter pelo menos 3 caracteres')
    .max(10, 'O código do banco deve ter no máximo 10 caracteres'),
  balance: z.number().optional(),
});

type RegistrationAccountFormValues = z.infer<typeof RegistrationAccountSchema>;

export { RegistrationAccountSchema };
export type { RegistrationAccountFormValues };
