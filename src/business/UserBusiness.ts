import { UserDatabase } from '../data/UserDatabase';
import { User } from '../entites/User';
import { ConflictError } from '../error/ConflictError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { PasswordFormatValidator } from '../services/PasswordFormatValidator';
import { userInputDTO } from '../types/user';

export class UserBusiness {
  public async signup(input: userInputDTO) {
    const { name, nickname, email, password } = input;

    if (!name || !nickname || !email || !password) {
      throw new MissingDependenciesError(
        'Missing dependencies: "name" or "nickname" or "email" or "password"'
      );
    }

    // TODO validar email

    const passwordFormatValidator = new PasswordFormatValidator();

    passwordFormatValidator.validate(password);
    // TODO validar password

    const userDatabase = new UserDatabase();
    const thisEmailExist = await userDatabase.getByEmail(email);

    if (thisEmailExist) {
      throw new ConflictError('Sorry, email already registered');
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const user = new User(id, name, nickname, email, hashPassword);
    await userDatabase.create(user);
  }
}
