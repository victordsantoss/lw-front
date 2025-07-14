import { TransactionType } from '../enums/transaction.enum';
import { TransactionCategory } from '../enums/transaction.enum';

export interface AccountModelStatement {
  id: string;
  transactionType: TransactionType;
  category: TransactionCategory;
  balance: number;
  description?: string;
  externalReference?: string;
  processedAt?: Date;
  createdAt: Date;
}
