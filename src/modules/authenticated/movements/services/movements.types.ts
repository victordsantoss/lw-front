import { AccountModelStatement } from '@/common/models/account-statement.entity';
import { IPaginatedRequest, IPaginatedResponse } from '@/common/types/base-pagination.types';

export namespace Movement {
  export type IListMovementsRequest = IPaginatedRequest;

  export type IListMovementItem = AccountModelStatement & {
    accountId: string;
    accountNumber: string;
    accountName: string;
    destinationAccountId?: string;
    destinationAccountNumber?: string;
    destinationAccountName?: string;
  };
  export type IListMovementsResponse = IPaginatedResponse<IListMovementItem>;
}
