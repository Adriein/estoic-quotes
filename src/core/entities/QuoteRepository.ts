import { Repository } from './Repository';
import { Translation } from './Translation';

export interface QuoteRepository<T> extends Repository<T> {
  saveTranslation(translation: Translation): Promise<void>;
  updateTranslation(id: string, translation: string): Promise<void>;
}
