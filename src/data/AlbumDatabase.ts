import { Album } from '../entities/Album';
import { BaseDatabase } from './BaseDatabase';

export class AlbumDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_albums';

  async create(album: Album) {
    try {
      await this.getConnection().insert(album).into(AlbumDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  async getAll() {
    try {
      const result = await this.getConnection()
        .select('*')
        .into(AlbumDatabase.TABLE_NAME);
      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
