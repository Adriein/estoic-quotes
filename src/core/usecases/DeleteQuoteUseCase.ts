import { Quote, Repository, UseCase, Result } from '../entities';

export class DeleteQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: Repository<number>) {}

  async execute(id: string): Promise<Result<Quote>> {
    return new Result(await this.repository.delete(id));
  }
}
