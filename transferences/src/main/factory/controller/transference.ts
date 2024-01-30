import { MakeTransferenceController } from "../../../presentational/controllers/makeTransference";
import { createTransferenceUsecaseFactory } from "../usecase/transference";

export function createTransferenceControllerFactory() {
  return new MakeTransferenceController(createTransferenceUsecaseFactory());
}
