import { Subscriber, Result, Repository, UseCase, Mailer } from '../entities';
import { subscribe } from '../../routes/subscribe';

export class SendMailsUseCase implements UseCase<Subscriber> {
  constructor(
    private repository: Repository<Subscriber>,
    private mailer: Mailer
  ) {}

  async execute(): Promise<Result<Subscriber>> {
    //Get all subscribers emails
    const subscribers = await this.repository.find({});

    let emails = [];
    for (const subscriber of subscribers) {
      if (subscriber.confirmed && subscriber.active) {
        emails.push(subscriber.email!);
      }

      continue;
    }

    //Send the mail to all subscribers
    this.mailer.send(emails);

    return new Result(await this.repository.find({}));
  }
}
