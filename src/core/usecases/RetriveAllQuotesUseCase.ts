import { Quote, QuoteRepository, UseCase, Result, type } from '../entities';

export class RetriveAllQuotesUseCase implements UseCase<Quote> {
  constructor(private repository: QuoteRepository<Quote>) {}

  async execute(): Promise<Result<Quote>> {
    const quotes = await this.repository.find({});

    const completedQuotes = await Promise.all(
      quotes.map(async (quote) => {
        const translations = await this.repository.findRelatedTranslations(
          quote._id!
        );
        if (translations.length < 1) return quote;
        quote.translations = translations;
        return quote;
      })
    );

    return new Result(completedQuotes);
  }
}
