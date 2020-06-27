import { Quote } from '../../../core/entities';
import { QuoteDoc } from '../schemas/QuoteSchema';

export class QuoteMapper {
  quotesSchemaToDomainQuotes(quotes: QuoteDoc[]): Quote[] {
    return quotes.map((quote) => {
      return {
        _id: quote._id,
        author: quote.author,
        topic: quote.topic,
        quote: quote.quote,
        origin: quote.origin,
        creationDate: quote.creationDate,
      };
    }) as Quote[];
  }

  quoteSchemaToDomainQuote(quote: QuoteDoc): Quote {
    return {
      _id: quote._id,
      author: quote.author,
      topic: quote.topic,
      quote: quote.quote,
      origin: quote.origin,
      creationDate: quote.creationDate,
    } as Quote;
  }
}