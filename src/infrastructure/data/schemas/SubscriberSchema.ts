import mongoose, { Schema } from 'mongoose';

export interface SubscriberDoc extends mongoose.Document {
  email: string;
  confirmed: string;
  active: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    confirmed: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const SubscriberModel = mongoose.model<SubscriberDoc>(
  'Subscriber',
  subscriberSchema
);
