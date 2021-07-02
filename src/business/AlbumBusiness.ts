import { BaseError } from '../error/BaseError';
import { ConflictError } from '../error/ConflictError';

export class AlbumBusiness {
  async create(name: string) {
    try {
    } catch (error) {
      if (error.message.includes('Duplicate')) {
        throw new ConflictError('Genre already registered under this name');
      }
      throw new BaseError(error.sqlMessage || error.message, error.code || 500);
    }
  }
}
