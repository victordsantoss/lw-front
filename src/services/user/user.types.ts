import { UserModel } from '@/common/models/user.model';

export namespace User {
  export type IAuthenticatedUserResponse = {
    id: string;
    token: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date | null;
    user: UserModel;
  };
}
