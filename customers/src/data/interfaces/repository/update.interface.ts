export interface IUpdateRepository<T> {
  loadById: (id: string) => Promise<T | null | undefined>;
  update: (data: T) => Promise<T>;
}
