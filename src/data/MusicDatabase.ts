import { Music } from '../entities/Music';
import { BaseDatabase } from './BaseDatabase';

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_musics';

  public async create(music: Music) {
    try {
      await this.getConnection().insert(music).into(MusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
