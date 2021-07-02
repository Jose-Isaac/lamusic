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
}
