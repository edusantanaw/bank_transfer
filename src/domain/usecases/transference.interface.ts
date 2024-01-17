export type ITransfeData = {
  userFrom: string;
  userTo: string;
  value: number;
};

export interface ITransferenceUsecase {
  execute: (data: ITransfeData) => Promise<boolean>;
}
