import { Genre } from '../entities/Genre';
import { NotFoundError } from '../error/NotFoundError';
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

  async getAll() {
    try {
      const result = await this.getConnection()
        .select('*')
        .into(GenreDatabase.TABLE_NAME);

      if (!result.length) {
        throw new NotFoundError('no gender found');
      }

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  private toGenreModel(result: any): Genre {
    const { id, name } = result;

    const genre = new Genre(id, name);

    return genre;
  }
}
