export class CrudRepositoryMock<T> {
  items: T[] = [];
  createInput: T | null = null;
  updateInput: T | null = null;
  deleteInput: string | null = null;
  async create(data: T) {
    this.createInput = data;
    this.items.push(data);
    return data
  }

  async update(data: T) {
    this.items.push(data);
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
