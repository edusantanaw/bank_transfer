import { Request, Response } from "express";

export default <T>(controller: IController<T>) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      return res.status(Number(response.statusCode)).json(response.body);
    } catch (error) {
      return res.status(500).send("Internal Server Error!");
    }
  };
};
