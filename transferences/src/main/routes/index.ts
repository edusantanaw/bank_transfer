import { Express } from "express";
import expressAdapter from "../adapters/express";
import { createTransferenceControllerFactory } from "../factory/controller/transference";

export default (app: Express) => {
  app.post(
    "/api/transferences",
    expressAdapter(createTransferenceControllerFactory())
  ); 
};
