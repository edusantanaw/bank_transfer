import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cb = () => console.log(`Server running at: ${PORT}`);
app.listen(PORT, cb);
