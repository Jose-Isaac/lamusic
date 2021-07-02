import { BaseError } from '../error/BaseError';

export class RelationshipMusicGenreBusiness {
  async create(genresIds: Array<string>) {
    try {
      for (let genreId of genresIds) {
        await 
      }
    } catch (error) {
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
