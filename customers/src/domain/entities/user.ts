import { IUser } from "./../../@types/user";
import { randomUUID } from "node:crypto";

interface ICreateUserData extends Omit<IUser, "id"> {
  id?: string;
}

export class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private cpfCnpj: string;
  private isShopkeeper: boolean;
  private balance: number = 0;

  constructor(data: ICreateUserData) {
    this.id = data.id ?? randomUUID();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.cpfCnpj = data.cpfCnpj;
    this.isShopkeeper = data.isShopkeeper;
    this.balance = data.balance;
  }

  public decrementBalance(value: number) {
    if (value > this.balance) throw new Error("Valor maior que o saldo atual!");
    this.balance = this.balance - value;
  }

  public icrementBalance(value: number) {
    this.balance = this.balance + value;
  }

  set setPassword(pass: string) {
    this.password = pass;
  }

  get getPassword() {
    return this.password;
  }

  get getUser(): IUser {
    return {
      id: this.id,
      cpfCnpj: this.cpfCnpj,
      email: this.email,
      isShopkeeper: this.isShopkeeper,
      name: this.name,
      password: this.password,
      balance: this.balance,
    };
  }
}
