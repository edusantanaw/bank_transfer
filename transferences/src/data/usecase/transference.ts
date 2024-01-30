import {
  ITransfeData,
  ITransferenceUsecase,
} from "../../../../customers/src/domain/usecases/transference.interface";
import { ICreateRepository } from "../../../../customers/src/data/interfaces/repository/create.interface";
import { IUpdateRepository } from "../../../../customers/src/data/interfaces/repository/update.interface";
import { Transference } from "../../domain/entities/transference";
import { CustomerEntity } from "../../domain/entities/customer";

export class TransferenceUsecase implements ITransferenceUsecase {
  constructor(
    private readonly userRepository: IUpdateRepository<ICustomer>,
    private readonly transferRepository: ICreateRepository<ITransference>
  ) {}

  async execute(data: ITransfeData): Promise<boolean> {
    const [userFrom, userTo] = await Promise.all([
      this.userRepository.loadById(data.userFrom),
      this.userRepository.loadById(data.userTo),
    ]);
    if (!userFrom) throw new Error("Usuario remetente não encontrado!");
    if (!userTo) throw new Error("Usuario receptor não encontrado!");
    const userFromEntity = new CustomerEntity(userFrom);
    const userToEntity = new CustomerEntity(userTo);
    userFromEntity.decrementBalance(data.value);
    userToEntity.icrementBalance(data.value);
    const transferEntity = new Transference({
      from: userFrom.id,
      to: userTo.id,
      value: data.value,
    });
    await Promise.all([
      this.userRepository.update(userFromEntity.getCustomer),
      this.userRepository.update(userToEntity.getCustomer),
    ]);
    await this.transferRepository.create(transferEntity.getTransference);
    return true;
  }
}
