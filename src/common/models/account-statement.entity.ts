import { TransactionType } from '../enums/transaction.enum';
import { TransactionCategory } from '../enums/transaction.enum';

export interface AccountStatement {
  id: string;
  transactionType: TransactionType;
  category: TransactionCategory;
  amount: number;
  description?: string;
  externalReference?: string;
  processedAt?: Date;
  createdAt: Date;
  account: {
    id: string;
    statements?: AccountStatement[];
  };
}
