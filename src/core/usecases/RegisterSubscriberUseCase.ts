import { Subscriber, UseCase, Result, Repository } from '../entities';

export class RegisterSubscriberUseCase implements UseCase<Subscriber> {
  constructor(private repository: Repository<Subscriber>) {}
  async execute(subscriber: Subscriber): Promise<Result<Subscriber>> {
    const newSubscriber = {
      email: subscriber.email,
      active: false,
      confirmed: false,
    } as Subscriber;

    const result = await this.repository.save(newSubscriber);
    
    return new Result([result]);
  }
}
