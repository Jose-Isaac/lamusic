import { RelationshipMusicGenreDatabase } from '../data/RelationshipMusicGenreDatabase';
import { BaseError } from '../error/BaseError';

export class RelationshipMusicGenreBusiness {
  async create(genresIds: Array<string>, musicId: string) {
    try {
      const relationshipMusicGenreDatabase =
        new RelationshipMusicGenreDatabase();

      for (let genreId of genresIds) {
        await relationshipMusicGenreDatabase.create({
          music_id: musicId,
          genre_id: genreId,
        });
      }

      return await relationshipMusicGenreDatabase.getGenresByMusic(musicId);
    } catch (error) {
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
