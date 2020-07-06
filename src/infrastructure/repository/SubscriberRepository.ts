import { Quote, Repository, Translation } from '../../core/entities';
import { QuoteModel } from '../data/schemas/QuoteSchema';
import { QuoteMapper, TranslationMapper } from '../data/mappers';
import { TranslationModel } from '../data/schemas/TranslationSchema';

export class SubscriberRepository implements Repository<Quote> {
  private mapper: QuoteMapper;
  private transMapper: TranslationMapper;

  constructor() {
    this.mapper = new QuoteMapper();
    this.transMapper = new TranslationMapper();
  }
  async find(searchObj: any): Promise<Quote[]> {
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
