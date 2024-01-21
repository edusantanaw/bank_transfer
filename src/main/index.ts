import express from "express";
import routes from "./routes";
import * as dotenv from "dotenv";

dotenv.config()
const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app)
const cb = () => console.log(`Server running at: ${PORT}`);
app.listen(PORT, cb);
