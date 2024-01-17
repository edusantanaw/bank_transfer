import { CrudRepositoryMock } from "./crud.repository";

export class UserRepository extends CrudRepositoryMock<IUser> {
  loadByEmailInput: string | null = null;
  loadByCpfCnpjInput: string | null = null;
  async loadByEmail(email: string) {
    this.loadByEmailInput = email;
    const item = this.items.find((c) => c.email === email);
    return item;
  }

  async loadByCpfCnpj(cpfCnpj: string) {
    this.loadByCpfCnpjInput = cpfCnpj;
    const item = this.items.find((c) => c.cpfCnpj === cpfCnpj);
    return item;
  }

  async loadById(id: string) {
    const item = this.items.filter((i) => i.id === id)[0];
    if (item) return item;
    return null;
  }
}
