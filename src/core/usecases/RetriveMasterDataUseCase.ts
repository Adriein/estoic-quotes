import { MasterData, Repository, UseCase, Result } from '../entities';

export class RetriveMasterDataUseCase implements UseCase<MasterData>{
  constructor(private repository: Repository<MasterData>) {}

  async execute(params?: any): Promise<Result<MasterData>> {
    return new Result(await this.repository.find({}));
  }
}
