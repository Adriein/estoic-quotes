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
    return this.mapper.quotesSchemaToDomainQuotes(
      await QuoteModel.find(searchObj).exec()
    );
  }

  async fetch(id: string): Promise<Quote> {
    const quote = await QuoteModel.findById(id).exec();
    if (quote !== null) return this.mapper.quoteSchemaToDomainQuote(quote);
    return {};
  }

  async save(body: Quote): Promise<Quote> {
    return this.mapper.quoteSchemaToDomainQuote(
      await new QuoteModel(body).save()
    );
  }

  async put(id: string, body: Quote): Promise<Quote> {
    await QuoteModel.updateOne({ _id: id }, body);
    return await this.fetch(id);
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
