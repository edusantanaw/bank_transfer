import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

type IData = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpfCnpj: string;
  isShopkeeper: boolean;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;
  @Column()
  @Index({ unique: true })
  id: string;
  @Column()
  name!: string;
  @Column()
  @Index({ unique: true })
  email!: string;
  @Column()
  password!: string;
  @Column()
  @Index({ unique: true })
  cpfCnpj!: string;
  @Column()
  isShopkeeper!: boolean;
  @Column("float")
  balance!: number;

  constructor(data: IData) {
    this.name = data.name;
    this.email = data.email;
    this.cpfCnpj = data.cpfCnpj;
    this.password = data.password;
    this.isShopkeeper = data.isShopkeeper;
    this.balance = 0;
    this.id = data.id;
  }
}
