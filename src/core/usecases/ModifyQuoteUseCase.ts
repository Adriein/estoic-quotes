import { Quote, Repository, UseCase, Result } from '../entities';
import { isEmpty } from '../helpers';
import { NotFound } from '../errors/NotFound';

export class ModifyQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: Repository<Quote>) {}

  async execute(quote: Quote): Promise<Result<Quote>> {
    const quoteOnDb = await this.repository.put(quote._id!, quote);
    if (isEmpty(quoteOnDb)) throw new NotFound('Quote not found');
    return new Result([quoteOnDb]);
  }
}
