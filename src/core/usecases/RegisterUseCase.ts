import { User, Result, Repository, UseCase } from '../entities';
import { AlreadyExists } from '../errors';
import { isEmpty } from '../helpers';

export class RegisterUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Result<User>> {
    const userOnDB = await this.repository.fetch(body.username!);
    if (!isEmpty(userOnDB))
      throw new AlreadyExists('User already exists in DB');

    const createdUser = await this.repository.save(body);

    return new Result<User>([createdUser]);
  }
}
