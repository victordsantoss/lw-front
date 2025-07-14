import { AccountModel } from '@/common/models/account.model';
import { IPaginatedRequest, IPaginatedResponse } from '@/common/types/base-pagination.types';
import { AccountType } from '@/common/enums/account.enum';

export namespace Account {
  export type IRegisterRequest = {
    name?: string;
    accountNumber: string;
    agency: string;
    bankName: string;
    bankCode: string;
    accountType: AccountType;
    balance?: number;
  };

  export type IListAccountItem = AccountModel & {
    balance: number;
  };

  export type IListAccountsRequest = IPaginatedRequest;
  export type IListAccountsResponse = IPaginatedResponse<IListAccountItem>;
  export type IRegisterResponse = AccountModel;
}
