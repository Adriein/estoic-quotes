import { Quote } from '../../core/entities/Quote';
import { Repository } from '../../core/entities/Repository';
import { MongoDs } from '../data/MongoDS';

export class QuoteRepository implements Repository<Quote> {
  private datasource: MongoDs;

  constructor() {
    this.datasource = new MongoDs();
  }

  async find(): Promise<Quote[]> {
    return this.datasource.findAllQuotes();
  }
}
