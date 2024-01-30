import { randomUUID } from "node:crypto";

interface ICreateUserData extends Omit<ICustomer, "id"> {
  id?: string;
}

export class CustomerEntity {
  private id: string;
  private cpfCnpj: string;
  private isShopkeeper: boolean;
  private balance: number = 0;

  constructor(data: ICreateUserData) {
    this.id = data.id ?? randomUUID();
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

  get getCustomer(): ICustomer {
    return {
      id: this.id,
      cpfCnpj: this.cpfCnpj,
      isShopkeeper: this.isShopkeeper,
      balance: this.balance,
    };
  }
}
