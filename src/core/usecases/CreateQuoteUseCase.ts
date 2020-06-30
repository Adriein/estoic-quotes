import { Quote, QuoteRepository, UseCase, Result, type } from '../entities';

export class CreateQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(body: any): Promise<Result<Quote>> {
    //save the original quote
    const savedQuote = await this.repository.save({
      topic: body.topic,
      quote: body.quote,
    });

    //save the translated quote
    await this.repository.saveTranslation({
      type: type.QUOTE,
      original: savedQuote._id,
      spanish: body.translatedQuote || '',
    });

    //return the result of saving the quote
    return new Result([savedQuote]);
  }
}
