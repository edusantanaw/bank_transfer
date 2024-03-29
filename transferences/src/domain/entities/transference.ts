import { randomUUID } from "node:crypto";

interface IDataTransference {
  id?: string;
  from: string;
  to: string;
  value: number;
  date?: Date;
}

export class Transference {
  private id: string;
  private from: string;
  private to: string;
  private value: number;
  private date: Date;

  constructor(data: IDataTransference) {
    this.id = data.id ?? randomUUID();
    this.from = data.from;
    this.to = data.to;
    if (this.to === this.from)
      throw new Error("Oss usuarios devem ser diferentes!");
    this.value = data.value;
    if (this.value <= 0)
      throw new Error("O valor da transferencia deve ser maior que 0!");
    this.date = data.date ?? new Date();
  }

  get getTransference(): ITransference {
    return {
      id: this.id,
      date: this.date,
      from: this.from,
      to: this.to,
      value: this.value,
    };
  }
}
