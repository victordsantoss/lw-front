import { z } from 'zod';

const RegisterMovementSchema = z.object({
  type: z.enum(['deposit', 'withdrawal', 'transfer'] as const, {
    required_error: 'O tipo de movimentação é obrigatório',
  }),
  origin: z.string({
    required_error: 'A conta de origem é obrigatória',
  }).min(1, 'A conta de origem é obrigatória'),
  destination: z.string().optional(),
  balance: z
    .string({ required_error: 'O valor é obrigatório' })
    .transform((val) => {
      if (!val || val === '') return 0;
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => val > 0, {
      message: 'O valor deve ser maior que zero'
    }),
  description: z.string().optional(),
}).refine((data) => {
  // Se for transferência, destination é obrigatório
  if (data.type === 'transfer') {
    return data.destination && data.destination.length > 0;
  }
  return true;
}, {
  message: 'A conta de destino é obrigatória para transferências',
  path: ['destination'],
}).refine((data) => {
  // Para transferência, origin e destination devem ser diferentes
  if (data.type === 'transfer' && data.destination) {
    return data.origin !== data.destination;
  }
  return true;
}, {
  message: 'A conta de origem e destino devem ser diferentes',
  path: ['destination'],
});

type RegisterMovementFormValues = z.infer<typeof RegisterMovementSchema>;

export { RegisterMovementSchema };
export type { RegisterMovementFormValues }; 