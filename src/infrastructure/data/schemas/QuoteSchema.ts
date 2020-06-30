import mongoose, { Schema } from 'mongoose';

export interface QuoteDoc extends mongoose.Document {
  topic: string;
  author: string;
  quote: string;
  origin: string;
  creationDate: Date;
}

const quoteSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const QuoteModel = mongoose.model<QuoteDoc>('Quote', quoteSchema);
