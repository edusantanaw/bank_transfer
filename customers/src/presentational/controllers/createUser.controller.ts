import { IUser } from "../../@types/user";
import { ICreateUsecase } from "../../domain/usecases/create.interface";
import { AlreadyExistsError } from "../../helpers/errors/AlreadyExists.errors";
import { BadRequest, Created, ServerCaptureError } from "../helpers/httpStatus";
import { SchemaValidator } from "../validation/schemaValidator";

export class CreateUserController implements IController<Omit<IUser, "id">> {
  constructor(
    private readonly schemaValidator: SchemaValidator<Omit<IUser, "id">>,
    private readonly createUserUsecase: ICreateUsecase<
      Omit<IUser, "id">,
      Omit<IUser, "password">
    >
  ) {}
  public async handle(data: Omit<IUser, "id">): Promise<HttpResponse> {
    try {
      const errors = this.schemaValidator.validSchema(data);
      if (errors.length > 0) return BadRequest(errors);
      const createdUser = await this.createUserUsecase.execute(data);
      return Created(createdUser);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        return BadRequest(error.message);
      }
      return ServerCaptureError();
    }
  }
}
