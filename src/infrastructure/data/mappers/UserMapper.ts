import { User } from '../../../core/entities';
import { UserDoc } from '../schemas/UserSchema';

export class UserMapper {
  userSchemaToDomainUser({ _id, username, email, password }: UserDoc): User {
    return { _id, username, email, password } as User;
  }
}
