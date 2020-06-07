import { Repository } from '../entities/Repository';
import { Quote } from '../entities/Quote';

export class RetriveAllQuotesUseCase {
  constructor(private repository: Repository<Quote>) {}

  async execute(): Promise<Quote[]> {
    return await this.repository.find();
  }
}
