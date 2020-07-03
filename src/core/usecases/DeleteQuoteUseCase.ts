import { Quote, QuoteRepository, UseCase, Result } from '../entities';

export class DeleteQuoteUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(id: string): Promise<Result<Quote>> {
    //fetch for tranlations related to the quote we are trying to delete
    const relatedTranlations = await this.repository.findRelatedTranslations(
      id
    );
    relatedTranlations.forEach(async () => {
      await this.repository.deleteTranslation(id);
    });

    await this.repository.delete(id);
    return new Result([{ _id: id }]);
  }
}
