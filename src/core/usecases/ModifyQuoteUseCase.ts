import {
  Quote,
  QuoteRepository,
  UseCase,
  Result,
  type,
  Translation,
} from '../entities';
import { isEmpty, validateQuote } from '../helpers';
import { NotFound } from '../errors/NotFound';
import { BadRequest } from '../errors';

export class ModifyQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(quoteId: string, quote: any): Promise<Result<Quote>> {
    //Check if the quote is completed
    if (!validateQuote(quote))
      throw new BadRequest('Some field of the quote is missing');

    const quoteOnDb = await this.repository.fetch(quoteId);

    if (isEmpty(quoteOnDb)) throw new NotFound('Quote not found');

    const updatedOnDb = await this.repository.put(quoteId, quote);

    //fetch for tranlations related to the quote we are trying to update
    const relatedTranlations = await this.repository.findRelatedTranslations(
      quoteId
    );

    for (const translation of relatedTranlations) {
      await this.repository.updateTranslation(translation._id!, {
        type: translation.type,
        original: quoteId,
        spanish: getCorrectTranslation(quote, translation),
      });
    }

    return new Result([updatedOnDb]);
  }
}

const getCorrectTranslation = (
  quote: any,
  translation: Translation
): string => {
  switch (translation.type) {
    case type.AUTHOR:
      return quote.translatedAuthor;
    case type.ORIGIN:
      return quote.translatedOrigin;
    case type.QUOTE:
      return quote.translatedQuote;
    default:
      return '';
  }
};
