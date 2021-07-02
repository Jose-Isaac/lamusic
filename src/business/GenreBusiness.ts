import { GenreDatabase } from '../data/GenreDatabase';
import { Genre } from '../entities/Genre';
import { BaseError } from '../error/BaseError';
import { ConflictError } from '../error/ConflictError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { IdGenerator } from '../services/IdGenerator';

export class GenreBusiness {
  async create(name: string): Promise<Genre> {
    try {
      if (!name) {
        throw new MissingDependenciesError('Missing dependencies: "name"');
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const genre = new Genre(id, name);

      const genreDatabase = new GenreDatabase();
      await genreDatabase.create(genre);

      return genre;
    } catch (error) {
      if (error.message.includes('Duplicate')) {
        throw new ConflictError('Genre already registered under this name');
      }
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
