import mongoose, { Schema } from 'mongoose';

export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  creationDate: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDoc>('User', userSchema);
