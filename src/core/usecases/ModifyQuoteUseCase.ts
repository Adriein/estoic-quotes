import { Quote, QuoteRepository, UseCase, Result, type } from '../entities';
import { isEmpty } from '../helpers';
import { NotFound } from '../errors/NotFound';

export class ModifyQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(quote: any): Promise<Result<Quote>> {
    const quoteOnDb = await this.repository.fetch(quote._id!);
    if (isEmpty(quoteOnDb)) throw new NotFound('Quote not found');

    const updatedOnDb = await this.repository.put(quote._id!, quote);

    //save the translated quote
    await this.repository.updateTranslation(quote._id, {
      type: type.QUOTE,
      original: quote._id,
      spanish: quote.translatedQuote || "",
    });
    
    return new Result([updatedOnDb]);
  }
}
