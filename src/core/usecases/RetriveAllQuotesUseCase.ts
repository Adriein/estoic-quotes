import { Quote, Repository, UseCase, Result } from '../entities';

export class RetriveAllQuotesUseCase implements UseCase<Quote>{
  constructor(private repository: Repository<Quote>) {}

  async execute(params?: any): Promise<Result<Quote>> {
    return new Result(await this.repository.find({}));
  }
}
