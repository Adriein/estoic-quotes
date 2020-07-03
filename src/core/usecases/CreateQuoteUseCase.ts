import { Quote, QuoteRepository, UseCase, Result, type } from '../entities';
import { validateQuote } from '../helpers';
import { BadRequest } from '../errors';

export class CreateQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(body: any): Promise<Result<Quote>> {
    //Check if the quote is completed
    if (!validateQuote(body))
      throw new BadRequest('Some field of the quote is missing');
      
    //save the original quote
    const savedQuote = await this.repository.save({
      author: body.author,
      origin: body.origin,
      topic: body.topic,
      quote: body.quote,
    });

    //save the translated quote
    await Promise.all([
      this.repository.saveTranslation({
        type: type.AUTHOR,
        original: savedQuote._id,
        spanish: body.translatedAuthor,
      }),
      this.repository.saveTranslation({
        type: type.ORIGIN,
        original: savedQuote._id,
        spanish: body.translatedOrigin,
      }),
      this.repository.saveTranslation({
        type: type.QUOTE,
        original: savedQuote._id,
        spanish: body.translatedQuote,
      }),
    ]);

    //return the result of saving the quote
    return new Result([savedQuote]);
  }
}
