import { UserDatabase } from '../data/UserDatabase';
import { User } from '../entites/User';
import { ConflictError } from '../error/ConflictError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { Authenticator } from '../services/Authenticator';
import { EmailFormatValidator } from '../services/EmailFormatValidator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { PasswordFormatValidator } from '../services/PasswordFormatValidator';
import { userAuthenticatorCredentials, userInputDTO } from '../types/user';

export class UserBusiness {
  public async signup(input: userInputDTO): Promise<string> {
    const { name, nickname, email, password } = input;

    if (!name || !nickname || !email || !password) {
      throw new MissingDependenciesError(
        'Missing dependencies: "name" or "nickname" or "email" or "password"'
      );
    }

    const emailFormatValidator = new EmailFormatValidator();
    emailFormatValidator.validate(email);

    const passwordFormatValidator = new PasswordFormatValidator();
    passwordFormatValidator.validate(password);

    const userDatabase = new UserDatabase();
    const thisEmailExist = await userDatabase.getByEmail(email);

    if (thisEmailExist) {
      throw new ConflictError('Sorry, email already registered');
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userForDatabase = new User(id, name, nickname, email, hashPassword);
    const user = await userDatabase.create(userForDatabase);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id: user.getId(),
      role: user.getRole(),
    });

    return token;
  }

  public async login(input: userAuthenticatorCredentials): Promise<User> {
    const { email, password } = input;

    if (!email || !password) {
      throw new MissingDependenciesError(
        'Missing dependencies: "email" and "password"'
      );
    }

    const emailFormatValidator = new EmailFormatValidator();
    emailFormatValidator.validate(email);

    const passwordFormatValidator = new PasswordFormatValidator();
    passwordFormatValidator.validate(password);

    const userDatabase = new UserDatabase();
    const user = userDatabase.getByEmail(email);
  }
}
