import mongoose, { Schema } from 'mongoose';

export interface TranslationDoc extends mongoose.Document {
  type: string;
  original_id: string;
  spanish: string;
  creationDate: Date;
}

const translationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    original_id: {
      type: String,
      required: true,
    },
    spanish: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TranslationModel = mongoose.model<TranslationDoc>(
  'Translation',
  translationSchema
);
