import {
  ITransfeData,
  ITransferenceUsecase,
} from "../../domain/usecases/transfer.interface";
import { BadRequest, CatchError, Ok } from "../helpers/http/statusCode";

export class MakeTransferenceController {
  constructor(private readonly transferenceUsecase: ITransferenceUsecase) {}
  public async handle(data: ITransfeData) {
    try {
      if (!data.userFrom)
        return BadRequest("O usuario remetente é obrigatorio!");
      if (!data.userTo) return BadRequest("O usuario receptor é obrigatorio!");
      if (!data.value) return BadRequest("O valor é obrigatorio!");
      if (data.value <= 0) return BadRequest("O valor está invalido!");
      const response = await this.transferenceUsecase.execute(data);
      return Ok(response);
    } catch (error) {
      return CatchError(error);
    }
  }
}
