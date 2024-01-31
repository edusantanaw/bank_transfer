import bcrypt from "bcrypt";
import { IEncrypter } from "../../data/interfaces/helpers/encrypter.interface";

export class Encrypter implements IEncrypter {
  private rounds = 10;
  async generatehash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    const hashedPass = await bcrypt.hash(value, salt);
    return hashedPass;
  }
}
