import { Repository, Subscriber } from '../../core/entities';
import { SubscriberModel } from '../data/schemas';
import { SubscriberMapper } from '../data/mappers';

export class SubscriberRepository implements Repository<Subscriber> {
  private mapper: SubscriberMapper;

  constructor() {
    this.mapper = new SubscriberMapper();
  }
  async find(searchObj: any): Promise<Subscriber[]> {
    return this.mapper.subscriberSchemaToDomainSubscribers(
      await SubscriberModel.find(searchObj).exec()
    );
  }

  async fetch(id: string): Promise<Subscriber> {
    throw new Error();
  }

  async save(body: Subscriber): Promise<Subscriber> {
    return this.mapper.subscriberSchemaToDomainSubscriber(
      await new SubscriberModel(body).save()
    );
  }

  async put(id: string, body: Subscriber): Promise<Subscriber> {
    await SubscriberModel.updateOne({ _id: id }, body);
    return {};
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
