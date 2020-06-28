import mongoose, { Schema } from 'mongoose';

export interface AuthorDoc extends mongoose.Document {
  name: string;
  creationDate: Date;
}

const authorSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const AuthorModel = mongoose.model<AuthorDoc>('Author', authorSchema);
