import { User, Repository } from '../../core/entities';
import { UserModel } from '../data/schemas';
import { UserMapper } from '../data/mappers/UserMapper';

export class UserRepository implements Repository<User> {
  private mapper: UserMapper;

  constructor() {
    this.mapper = new UserMapper();
  }

  async find(): Promise<User[]> {
    throw new Error();
  }

  async fetch(id: string): Promise<User> {
    try {
      const response = await UserModel.findOne({
        username: id,
      }).exec();
      if (response !== null)
        return this.mapper.userSchemaToDomainUser(response);
      return {};
    } catch (error) {
      throw error;
    }
  }

  async save(body: User): Promise<User> {
    try {
      return this.mapper.userSchemaToDomainUser(
        await new UserModel(body).save()
      );
    } catch (error) {
      throw error;
    }
  }

  async put(id: string, body: User): Promise<User> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
