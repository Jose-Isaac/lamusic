import { Music } from '../entities/Music';
import { BaseDatabase } from './BaseDatabase';

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_musics';

  public async create(music: Music): Promise<Music | false> {
    try {
      await this.getConnection().insert(music).into(MusicDatabase.TABLE_NAME);
      const musicDatabase = await this.getById(music.getId());

      return musicDatabase;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getById(id: string): Promise<Music | false> {
    try {
      const result = await this.getConnection()
        .select()
        .where({ id: id })
        .into(MusicDatabase.TABLE_NAME);

      if (!result.length || !result[0].title) {
        return false;
      }

      return this.toMusicModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  private toMusicModel(result: any): Music {
    const { id, title, author_id, album_id, created_at, updated_at } = result;

    const user = new Music(
      id,
      title,
      author_id,
      album_id,
      created_at,
      updated_at
    );

    return user;
  }
}
