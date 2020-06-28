import mongoose, { Schema } from 'mongoose';

export interface TopicDoc extends mongoose.Document {
  topic: string;
  creationDate: Date;
}

const topicSchema = new Schema(
  {
    topic: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const TopicModel = mongoose.model<TopicDoc>('Topic', topicSchema);
