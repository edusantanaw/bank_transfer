import { IUser } from "../../@types/user";
import { Database } from "../../main/config/data-source";
import { User } from "../entity/User";

export class UserRepository {
  private readonly userRepository = Database.getRepository(User);
  public async create(data: IUser) {
    const user = new User(data);
    this.userRepository.save(user);
    return user as IUser;
  }

  public async loadByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    return user as IUser | null;
  }

  public async loadByCpfCnpj(cpfCnpj: string) {
    const user = await this.userRepository.findOneBy({
      cpfCnpj,
    });
    return user as IUser | null;
  }
}
