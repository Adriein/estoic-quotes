import { Subscriber } from '../../../core/entities';
import { SubscriberDoc } from '../schemas/SubscriberSchema';

export class SubscriberMapper {
  subscriberSchemaToDomainSubscribers(
    subscriberDoc: SubscriberDoc[]
  ): Subscriber[] {
    return subscriberDoc.map((subscriberDoc) => {
      return {
        _id: subscriberDoc._id,
        active: subscriberDoc.active,
        confirmed: subscriberDoc.confirmed,
        email: subscriberDoc.email,
      };
    }) as Subscriber[];
  }

  subscriberSchemaToDomainSubscriber(subscriberDoc: SubscriberDoc): Subscriber {
    return {
      _id: subscriberDoc._id,
      active: subscriberDoc.active,
      confirmed: subscriberDoc.confirmed,
      email: subscriberDoc.email,
    } as Subscriber;
  }
}
