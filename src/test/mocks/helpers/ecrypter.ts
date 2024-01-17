import { IEncrypter } from "../../../data/interfaces/helpers/encrypter.interface";

export class EncrypterMock implements IEncrypter {
  generatehashInput: null | string = null;
  hashResponse: string;
  constructor(hashResponse: string) {
    this.hashResponse = hashResponse;
  }
  async generatehash(value: string): Promise<string> {
    this.generatehashInput = value;
    return this.hashResponse;
  }
}
