import { AccountStatus, AccountType } from '../enums/account.enum';
import { AccountModelStatement } from './account-statement.entity';

export interface AccountModel {
  id: string;
  name?: string;
  accountNumber: string;
  agency: string;
  accountType: AccountType;
  status: AccountStatus;
  bankName: string;
  bankCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  statements: AccountModelStatement[];
}
