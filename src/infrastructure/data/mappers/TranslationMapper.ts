import { Translation } from '../../../core/entities';
import { TranslationDoc } from '../schemas/TranslationSchema';

export class TranslationMapper {
  translationSchemaToDomainTranslation(
    translation: TranslationDoc
  ): Translation {
    return {
      _id: translation._id,
      type: translation.type,
      original: translation.original_id,
      spanish: translation.spanish,
      creationDate: translation.creationDate,
    } as Translation;
  }
  domainTranslationToSchemaTranslation(
    translation: Translation
  ): TranslationDoc {
    return {
      type: translation.type,
      original_id: translation.original,
      spanish: translation.spanish,
    } as TranslationDoc;
  }
}
