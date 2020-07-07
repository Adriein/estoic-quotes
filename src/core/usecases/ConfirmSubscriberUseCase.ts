import { Subscriber, UseCase, Result, Repository } from '../entities';
import { BadRequest } from '../errors';

export class ConfirmSubscriberUseCase implements UseCase<Subscriber> {
  constructor(private repository: Repository<Subscriber>) {}
  async execute(subscriber: any): Promise<Result<Subscriber>> {
    const [subscriberOnDb] = await this.repository.find({
      email: subscriber[0].email,
    });

    if (!subscriberOnDb) throw new BadRequest('This subscriber not exists');

    const updatedSubscriber = {
      email: subscriber[0].email,
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
