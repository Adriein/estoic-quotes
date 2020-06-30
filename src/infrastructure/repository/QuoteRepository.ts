import {
  Quote,
  QuoteRepository as Repository,
  Translation,
} from '../../core/entities';
import { QuoteModel } from '../data/schemas/QuoteSchema';
import { QuoteMapper, TranslationMapper } from '../data/mappers';
import { TranslationModel } from '../data/schemas/TranslationSchema';

export class QuoteRepository implements Repository<Quote> {
  private mapper: QuoteMapper;
  private transMapper: TranslationMapper;

  constructor() {
    this.mapper = new QuoteMapper();
    this.transMapper = new TranslationMapper();
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

  async saveTranslation(translation: Translation): Promise<void> {
    const translationSchema = this.transMapper.domainTranslationToSchemaTranslation(
      translation
    );

    await new TranslationModel(translationSchema).save();
  }

  async updateTranslation(id: string, translation: Translation): Promise<void> {
    const translationSchema = this.transMapper.domainTranslationToSchemaTranslation(
      translation
    );

    await TranslationModel.updateOne({ _id: id }, translationSchema);
  }
}
