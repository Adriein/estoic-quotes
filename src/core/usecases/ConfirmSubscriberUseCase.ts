import { Subscriber, UseCase, Result, Repository } from '../entities';
import { BadRequest } from '../errors';

export class ConfirmSubscriberUseCase implements UseCase<Subscriber> {
  constructor(private repository: Repository<Subscriber>) {}
  async execute(subscriber: Subscriber): Promise<Result<Subscriber>> {
    const [subscriberOnDb] = await this.repository.find({
      email: subscriber.email,
    });

    if (!subscriberOnDb) throw new BadRequest('This subscriber not exists');

    const updatedSubscriber = {
      email: subscriber.email,
      active: true,
      confirmed: true,
    } as Subscriber;

    const result = await this.repository.put(
      subscriberOnDb._id!,
      updatedSubscriber
    );

    return new Result([result]);
  }
}
