import { Quote } from '../../../core/entities';
import { QuoteDoc } from '../schemas/QuoteSchema';

export class QuoteMapper {
  quoteSchemaToDomainQuote(quotes: QuoteDoc[]): Quote[] {
    return quotes.map((quote) => {
      return {
        _id: quote._id,
        author: quote.author,
        topic: quote.topic,
        quote: quote.quote,
        creationDate: quote.creationDate,
      };
    }) as Quote[];
  }
}
