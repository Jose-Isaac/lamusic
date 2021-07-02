import { Request, Response } from 'express';
import { MusicBusiness } from '../business/MusicBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class MusicController {
  public async create(request: Request, response: Response) {
    try {
      const token = request.headers.authorization as string;
      const { title, genresIds, albumId } = request.body;

      const musicBusiness = new MusicBusiness();
      await musicBusiness.create({ title, genresIds, albumId }, token);

      response.json({ message: 'Success' });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
