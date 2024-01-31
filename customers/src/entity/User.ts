import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
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
}
