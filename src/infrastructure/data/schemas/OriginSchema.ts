import mongoose, { Schema } from 'mongoose';

export interface OriginDoc extends mongoose.Document {
  origin: string;
  creationDate: Date;
}

const originSchema = new Schema(
  {
    origin: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const OriginModel = mongoose.model<OriginDoc>('Origin', originSchema);
