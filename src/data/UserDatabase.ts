import { User } from '../entites/User';
import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_users';

  public async create(user: User): Promise<User> {
    try {
      await this.getConnection().insert(user).into(UserDatabase.TABLE_NAME);

      const userDatabase = await this.getById(user.getId());

      return userDatabase;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.getConnection()
        .select()
        .where({ email })
        .into(UserDatabase.TABLE_NAME);

      if (result.length) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getById(id: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select()
        .where({ extern_id: id })
        .into(UserDatabase.TABLE_NAME);

      const {
        extern_id,
        name,
        nickname,
        email,
        password,
        role,
        created_at,
        updated_at,
      } = result[0];

      const user = new User(
        extern_id,
        name,
        nickname,
        email,
        password,
        role,
        created_at,
        updated_at
      );

      return user;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
