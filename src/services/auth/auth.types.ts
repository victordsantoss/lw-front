import { UserModel } from '@/common/models/user.model';

export namespace Auth {
  export type ILoginRequest = {
    email: string;
    password: string;
  };
  export type IRegisterRequest = {
    name: string;
    email: string;
    cpf: string;
    password: string;
  };
  export type IRegisterResponse = UserModel & {};
}
