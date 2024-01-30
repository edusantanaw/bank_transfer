export interface IEncrypter {
  generatehash: (value: string) => Promise<string>;
}
