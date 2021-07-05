import { UserDatabase } from '../data/UserDatabase';
import { User } from '../entities/User';
import { BaseError } from '../error/BaseError';
import { ConflictError } from '../error/ConflictError';
import { InvalidCredentialsError } from '../error/InvalidCredentialsError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { NotFoundError } from '../error/NotFoundError';
import { Authenticator } from '../services/Authenticator';
import { EmailFormatValidator } from '../services/EmailFormatValidator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { PasswordFormatValidator } from '../services/PasswordFormatValidator';
import { userAuthenticatorCredentials, userInputDTO } from '../types/user';

export class UserBusiness {
  public async signup(input: userInputDTO): Promise<string> {
    try {
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

      if (!user) {
        throw new BaseError(
          'internal error registering user, please try again',
          500
        );
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.getId(),
        role: user.getRole(),
      });

      return token;
    } catch (error) {
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }

  public async login(input: userAuthenticatorCredentials): Promise<string> {
    try {
      const { email, password } = input;

      // TODO aceitar nickname como forma de login
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
      const user = await userDatabase.getByEmail(email);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const hashManager = new HashManager();
      const passwordMatch = hashManager.compare(password, user.getPassword());

      if (!passwordMatch) {
        throw new InvalidCredentialsError('Invalid password');
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.getId(),
        role: user.getRole(),
      });

      return token;
    } catch (error) {
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
