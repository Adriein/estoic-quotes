import { Quote, Repository, UseCase, Result } from '../entities';
import { isEmpty } from '../helpers';
import { NotFound } from '../errors/NotFound';

export class ReadQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: Repository<Quote>) {}

  async execute(id: string): Promise<Result<Quote>> {
    const quote = await this.repository.fetch(id);
    if (isEmpty(quote)) throw new NotFound('Quote not found');
    return new Result([quote]);
  }
}
