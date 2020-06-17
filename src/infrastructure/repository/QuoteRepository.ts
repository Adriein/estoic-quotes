import { Quote } from '../../core/entities/Quote';
import { Repository } from '../../core/entities/Repository';

export class QuoteRepository implements Repository<Quote> {
  async find(): Promise<Quote[]> {
    throw new Error();
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
