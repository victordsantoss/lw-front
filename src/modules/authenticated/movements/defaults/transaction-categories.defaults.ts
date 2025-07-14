import { TransactionCategory } from "@/common/enums/transaction.enum";

export const TRANSACTION_CATEGORY_LABELS = {
  [TransactionCategory.DEPOSIT]: 'Depósito',
  [TransactionCategory.WITHDRAWAL]: 'Saque',
  [TransactionCategory.TRANSFER]: 'Transferência',
  [TransactionCategory.PAYMENT]: 'Pagamento',
  [TransactionCategory.FEE]: 'Taxa',
  [TransactionCategory.INTEREST]: 'Juros',
  [TransactionCategory.REFUND]: 'Estorno',
  [TransactionCategory.OTHER]: 'Outros',
} as const;

export const TRANSACTION_CATEGORY_DESCRIPTIONS = {
  [TransactionCategory.DEPOSIT]: 'Depósito',
  [TransactionCategory.WITHDRAWAL]: 'Saque',
  [TransactionCategory.TRANSFER]: 'Transferência',
  [TransactionCategory.PAYMENT]: 'Pagamento',
  [TransactionCategory.FEE]: 'Taxa',
  [TransactionCategory.INTEREST]: 'Juros',
  [TransactionCategory.REFUND]: 'Estorno',
  [TransactionCategory.OTHER]: 'Outros',
} as const;

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.DEPOSIT,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.DEPOSIT],
    description: TRANSACTION_CATEGORY_DESCRIPTIONS[TransactionCategory.DEPOSIT],
  },
  {
    value: TransactionCategory.WITHDRAWAL,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.WITHDRAWAL],
    description: TRANSACTION_CATEGORY_DESCRIPTIONS[TransactionCategory.WITHDRAWAL],
  },
] as const;
