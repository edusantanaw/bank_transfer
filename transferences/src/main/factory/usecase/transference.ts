import { CrudRepositoryMock } from "../../../../test/mocks/repository/repository";
import { TransferenceUsecase } from "../../../data/usecase/transference";

export function createTransferenceUsecaseFactory() {
  return new TransferenceUsecase(
    new CrudRepositoryMock<ICustomer>(),
    new CrudRepositoryMock<ITransference>()
  );
}
