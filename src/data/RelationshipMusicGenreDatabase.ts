import { Genre } from '../entities/Genre';
import { relationshipMusicGenreDTO } from '../types/music';
import { BaseDatabase } from './BaseDatabase';

export class RelationshipMusicGenreDatabase extends BaseDatabase {
  private static TABLE_NAME = 'lamusic_relationship_music_genre';

  async create(relationship: relationshipMusicGenreDTO) {
    try {
      await this.getConnection()
        .insert(relationship)
        .into(RelationshipMusicGenreDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getGenresByMusic(music_id: string): Promise<Array<Genre> | false> {
    try {
      const result = await this.getConnection()
        .raw(`select lamusic_genres.id, lamusic_genres.name
      from lamusic_genres
      inner join lamusic_relationship_music_genre 
      on lamusic_relationship_music_genre.music_id = '${music_id}' 
      and lamusic_relationship_music_genre.genre_id = lamusic_genres.id`);

      if (!result || !result[0].length) {
        return false;
      }

      const genres: Genre[] = [];
      for (let genre of result[0]) {
        genres.push(new Genre(genre.id, genre.name));
      }

      return genres;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
