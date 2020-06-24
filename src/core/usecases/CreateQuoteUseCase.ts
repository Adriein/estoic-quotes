import { Quote, Repository, UseCase, Result } from '../entities';

export class CreateQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: Repository<Quote>) {}

  async execute(body: any): Promise<Result<Quote>> {
    return new Result([await this.repository.save(body)]);
  }
}
