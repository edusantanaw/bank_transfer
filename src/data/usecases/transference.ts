import { Transaction } from "../../domain/entities/transaction";
import { UserEntity } from "../../domain/entities/user";
import {
  ITransfeData,
  ITransferenceUsecase,
} from "../../domain/usecases/transference.interface";
import { ICreateRepository } from "../interfaces/repository/create.interface";
import { IUpdateRepository } from "../interfaces/repository/update.interface";

export class TransferenceUsecase implements ITransferenceUsecase {
  constructor(
    private readonly userRepository: IUpdateRepository<IUser>,
    private readonly transferRepository: ICreateRepository<ITransaction>
  ) {}

  async execute(data: ITransfeData): Promise<boolean> {
    const [userFrom, userTo] = await Promise.all([
      this.userRepository.loadById(data.userFrom),
      this.userRepository.loadById(data.userTo),
    ]);
    if (!userFrom) throw new Error("Usuario remetente não encontrado!");
    if (!userTo) throw new Error("Usuario receptor não encontrado!");
    const userFromEntity = new UserEntity(userFrom);
    const userToEntity = new UserEntity(userTo);
    userFromEntity.decrementBalance(data.value);
    userToEntity.icrementBalance(data.value);
    const transferEntity = new Transaction({
      from: userFrom.id,
      to: userTo.id,
      value: data.value,
    });
    await Promise.all([
      this.userRepository.update(userFromEntity.getUser),
      this.userRepository.update(userToEntity.getUser),
    ]);
    await this.transferRepository.create(transferEntity.getTransaction);
    return true;
  }
}
