import { User } from '../entites/User';
import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_users';

  public async create(user: User): Promise<User> {
    try {
      await this.getConnection().insert(user).into(UserDatabase.TABLE_NAME);

      const userDatabase = await this.getById(user.getExternId());

      return userDatabase as User;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getByEmail(email: string): Promise<User | false> {
    try {
      const result = await this.getConnection()
        .select()
        .where({ email })
        .into(UserDatabase.TABLE_NAME);

      if (!result.length || !result[0].name) {
        return false;
      }

      return this.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getById(id: string): Promise<User | false> {
    try {
      const result = await this.getConnection()
        .select()
        .where({ extern_id: id })
        .into(UserDatabase.TABLE_NAME);

      if (!result.length || !result[0].name) {
        return false;
      }

      return this.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  private toUserModel(result: any): User {
    const {
      id,
      extern_id,
      name,
      nickname,
      email,
      password,
      role,
      created_at,
      updated_at,
    } = result;

    const user = new User(
      extern_id,
      name,
      nickname,
      email,
      password,
      role,
      created_at,
      updated_at,
      id
    );

    return user;
  }
}
