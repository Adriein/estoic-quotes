import { User, Result, Repository, UseCase } from '../entities';
import { BadRequest } from '../errors';
import { isEmpty, compare } from '../helpers';

export class SignInUseCase implements UseCase<User> {
  constructor(private repository: Repository<User>) {}

  async execute(body: User): Promise<Result<User>> {
    const { email, password } = body;

    //Check if the user exists
    const userOnDB = await this.repository.fetch(email!);
    if (isEmpty(userOnDB)) throw new BadRequest('Invalid credentials');

    //Compare the password
    if (!(await compare(userOnDB.password!, password!)))
      throw new BadRequest('Invalid Credentials');

    return new Result<User>([userOnDB]);
  }
}
