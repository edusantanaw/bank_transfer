import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../entity/User";
import env from "./env";

env();

const PGHOST = process.env.PGHOST;
const PGDATABASE = process.env.PGDATABASE;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;

export const Database = new DataSource({
  type: "postgres",
  host: PGHOST,
  port: Number(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
