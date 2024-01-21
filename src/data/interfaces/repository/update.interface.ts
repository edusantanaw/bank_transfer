export interface IUpdateRepository<T> {
  loadById: (id: string) => Promise<IUser | null | undefined>;
  update: (data: IUser) => Promise<IUser>;
}
