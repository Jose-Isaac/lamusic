import { AlbumDatabase } from '../data/AlbumDatabase';
import { Album } from '../entities/Album';
import { BaseError } from '../error/BaseError';
import { ConflictError } from '../error/ConflictError';
import { MissingDependenciesError } from '../error/MissingDependenciesError';
import { IdGenerator } from '../services/IdGenerator';

export class AlbumBusiness {
  async create(name: string) {
    try {
      if (!name) {
        throw new MissingDependenciesError('Missing dependencies: "name"');
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const album = new Album(id, name);

      const albumDatabase = new AlbumDatabase();
      await albumDatabase.create(album);

      return album;
    } catch (error) {
      if (error.message.includes('Duplicate')) {
        throw new ConflictError('Album already registered under this name');
      }
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
