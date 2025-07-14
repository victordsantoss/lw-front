import { AccountStatus } from '@/common/enums/account.enum';

export const ACCOUNT_STATUS_LABELS = {
  [AccountStatus.ACTIVE]: 'Ativa',
  [AccountStatus.INACTIVE]: 'Inativa',
  [AccountStatus.BLOCKED]: 'Bloqueada',
  [AccountStatus.CLOSED]: 'Encerrada',
} as const;

export const ACCOUNT_STATUS_DESCRIPTIONS = {
  [AccountStatus.ACTIVE]: 'Conta ativa e funcionando normalmente',
  [AccountStatus.INACTIVE]: 'Conta temporariamente inativa',
  [AccountStatus.BLOCKED]: 'Conta bloqueada por segurança',
  [AccountStatus.CLOSED]: 'Conta encerrada permanentemente',
} as const;

export const ACCOUNT_STATUS_OPTIONS = [
  {
    value: AccountStatus.ACTIVE,
    label: ACCOUNT_STATUS_LABELS[AccountStatus.ACTIVE],
    description: ACCOUNT_STATUS_DESCRIPTIONS[AccountStatus.ACTIVE],
  },
  {
    value: AccountStatus.INACTIVE,
    label: ACCOUNT_STATUS_LABELS[AccountStatus.INACTIVE],
    description: ACCOUNT_STATUS_DESCRIPTIONS[AccountStatus.INACTIVE],
  },
  {
    value: AccountStatus.BLOCKED,
    label: ACCOUNT_STATUS_LABELS[AccountStatus.BLOCKED],
    description: ACCOUNT_STATUS_DESCRIPTIONS[AccountStatus.BLOCKED],
  },
  {
    value: AccountStatus.CLOSED,
    label: ACCOUNT_STATUS_LABELS[AccountStatus.CLOSED],
    description: ACCOUNT_STATUS_DESCRIPTIONS[AccountStatus.CLOSED],
  },
] as const;
