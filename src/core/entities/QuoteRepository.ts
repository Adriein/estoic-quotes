import { Repository } from './Repository';
import { Translation } from './Translation';

export interface QuoteRepository<T> extends Repository<T> {
  saveTranslation(translation: Translation): Promise<void>;
  updateTranslation(id: string, translation: Translation): Promise<void>;
  findRelatedTranslations(quoteId: string): Promise<Translation[]>;
}
