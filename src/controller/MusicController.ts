import { Request, Response } from 'express';
import { MusicBusiness } from '../business/MusicBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class MusicController {
  public async create(request: Request, response: Response) {
    try {
      const token = request.headers.authorization as string;
      const { title, genresIds, albumId } = request.body;

      const musicBusiness = new MusicBusiness();
      const music = await musicBusiness.create(
        { title, genresIds, albumId },
        token
      );

      return response.json({ message: 'Success', music });
    } catch (error) {
      return response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
