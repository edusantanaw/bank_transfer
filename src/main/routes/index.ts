import { Express, Router } from "express";
import expressAdapter from "../adapter/express";
import { createUserControllerFactory } from "../factory/controllers/createUser";

export default (app: Express) => {
  const router = Router();
  router.post("/api/user", expressAdapter(createUserControllerFactory()));
  app.use(router);
};
