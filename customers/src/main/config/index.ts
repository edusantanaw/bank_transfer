import { User } from "../../entity/User";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    await AppDataSource.manager.save(user);
  })
  .catch((error) => console.log(error));
