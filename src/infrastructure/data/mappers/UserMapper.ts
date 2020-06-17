import mongoose from 'mongoose';
import { User } from '../../../core/entities';
import { UserDoc } from '../schemas/UserSchema';

export class UserMapper {
  userSchemaToDomainUser({ _id, username }: UserDoc): User {
    return { _id, username } as User;
  }
}
