import { Quote } from '../../core/entities/Quote';
import { Repository } from '../../core/entities/Repository';
import { QuoteModel } from '../data/schemas/QuoteSchema';
import { QuoteMapper } from '../data/mappers';

export class QuoteRepository implements Repository<Quote> {
  private mapper: QuoteMapper;

  constructor() {
    this.mapper = new QuoteMapper();
  }
  async find(searchObj: any): Promise<Quote[]> {
    return this.mapper.quoteSchemaToDomainQuote(
      await QuoteModel.find(searchObj).exec()
    );
  }

  async fetch(id: string): Promise<Quote> {
    throw new Error();
  }

  async save(body: Quote): Promise<Quote> {
    throw new Error();
  }

  async put(id: string, body: Quote): Promise<Quote> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
