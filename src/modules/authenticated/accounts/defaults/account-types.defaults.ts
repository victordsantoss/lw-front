import { AccountType } from '@/common/enums/account.enum';

export const ACCOUNT_TYPE_LABELS = {
  [AccountType.CHECKING]: 'Conta Corrente',
  [AccountType.SAVINGS]: 'Poupança',
  [AccountType.BUSINESS]: 'Conta Empresarial',
} as const;

export const ACCOUNT_TYPE_DESCRIPTIONS = {
  [AccountType.CHECKING]: 'Conta para movimentações diárias',
  [AccountType.SAVINGS]: 'Conta para investimentos e poupança',
  [AccountType.BUSINESS]: 'Conta para empresas e negócios',
} as const;

export const ACCOUNT_TYPE_OPTIONS = [
  {
    value: AccountType.CHECKING,
    label: ACCOUNT_TYPE_LABELS[AccountType.CHECKING],
    description: ACCOUNT_TYPE_DESCRIPTIONS[AccountType.CHECKING],
  },
  {
    value: AccountType.SAVINGS,
    label: ACCOUNT_TYPE_LABELS[AccountType.SAVINGS],
    description: ACCOUNT_TYPE_DESCRIPTIONS[AccountType.SAVINGS],
  },
  {
    value: AccountType.BUSINESS,
    label: ACCOUNT_TYPE_LABELS[AccountType.BUSINESS],
    description: ACCOUNT_TYPE_DESCRIPTIONS[AccountType.BUSINESS],
  },
] as const;
