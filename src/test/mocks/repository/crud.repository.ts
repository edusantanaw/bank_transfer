export class CrudRepositoryMock<T> {
  items: T[] = [];
  createInput: T[] = [];
  updateInput: T[] = [];
  deleteInput: string | null = null;
  async create(data: T) {
    this.createInput.push(data);
    this.items.push(data);
    return data
  }

  async update(data: T) {
    this.updateInput.push(data);
    return data;
  }

  async delete(id: string) {
    this.deleteInput = id;
    return;
  }

  async loadAll() {
    return this.items;
  }
}
