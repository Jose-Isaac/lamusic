import { User } from '../entites/User';
import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_users';

  public async create(user: User): Promise<User> {
    try {
      const result = await this.getConnection()
        .insert(user)
        .into(UserDatabase.TABLE_NAME);

      console.log(result);

      return user;
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
}
