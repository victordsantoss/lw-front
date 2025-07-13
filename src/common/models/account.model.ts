import { AccountStatus, AccountType } from '../enums/account.enum';
import { AccountStatement } from './account-statement.entity';


export interface Account {
  id: string;
  accountNumber: string;
  agency: string;
  accountType: AccountType;
  status: AccountStatus;
  bankName: string;
  bankCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: {
    id: string;
    accounts?: Account[];
  };
  statements: AccountStatement[];
} 