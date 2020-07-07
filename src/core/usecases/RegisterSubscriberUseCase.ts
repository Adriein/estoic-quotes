import { Subscriber, UseCase, Result, Repository, Mailer } from '../entities';
import { BadRequest } from '../errors';

export class RegisterSubscriberUseCase implements UseCase<Subscriber> {
  constructor(
    private repository: Repository<Subscriber>,
    private mailer: Mailer
  ) {}
  async execute(subscriber: Subscriber): Promise<Result<Subscriber>> {
    const newSubscriber = {
      email: subscriber.email,
      active: false,
      confirmed: false,
    } as Subscriber;

    const result = await this.repository.find({ email: subscriber.email });

    if (!result) throw new BadRequest('Email already registered');

    await this.repository.save(newSubscriber);

    await this.mailer.sendConfirmation(subscriber.email!);

    return new Result([{}]);
  }
}
