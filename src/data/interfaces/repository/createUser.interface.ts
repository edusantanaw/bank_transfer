import { ICreateRepository } from "./create.interface";

export interface ICreateUserRepository extends ICreateRepository<IUser> {
  loadByEmail: (email: string) => Promise<IUser | undefined | null>;
  loadByCpfCnpj: (cpfCnpj: string) => Promise<IUser | undefined | null>;
}
