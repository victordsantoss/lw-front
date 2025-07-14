import { TransactionType } from '@/common/enums/transaction.enum';

export const MOVEMENT_TYPE_LABELS = {
  [TransactionType.DEPOSIT]: 'Depósito',
  [TransactionType.DEBIT]: 'Débito',
} as const;

export const MOVEMENT_TYPE_DESCRIPTIONS = {
  [TransactionType.DEPOSIT]: 'Depósito',
  [TransactionType.DEBIT]: 'Débito',
} as const;

export const MOVEMENT_TYPE_OPTIONS = [
  {
    value: TransactionType.DEPOSIT,
    label: MOVEMENT_TYPE_LABELS[TransactionType.DEPOSIT],
    description: MOVEMENT_TYPE_DESCRIPTIONS[TransactionType.DEPOSIT],
  },
  {
    value: TransactionType.DEBIT,
    label: MOVEMENT_TYPE_LABELS[TransactionType.DEBIT],
    description: MOVEMENT_TYPE_DESCRIPTIONS[TransactionType.DEBIT],
  },
] as const;
