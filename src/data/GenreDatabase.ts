import { Genre } from '../entities/Genre';
import { BaseDatabase } from './BaseDatabase';

export class GenreDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_genres';
  async create(genre: Genre) {
    try {
      await this.getConnection().insert(genre).into(GenreDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
