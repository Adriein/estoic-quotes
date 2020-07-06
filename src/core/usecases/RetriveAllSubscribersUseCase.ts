import { Subscriber, Result, Repository, UseCase } from '../entities';

export class RetriveAllSubscribersUseCase implements UseCase<Subscriber> {
  constructor(private repository: Repository<Subscriber>) {}

  async execute(): Promise<Result<Subscriber>> {
    return new Result(await this.repository.find({}));
  }
}
