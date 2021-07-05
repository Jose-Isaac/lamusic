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

      response.json({ message: 'Success', music });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public async getAll(request: Request, response: Response) {
    try {
      const token = request.headers.authorization as string;

      const musicBusiness = new MusicBusiness();
      const musics = await musicBusiness.getAll(token);

      response.json({ message: 'Success', musics });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public async getById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const musicBusiness = new MusicBusiness();
      const music = await musicBusiness.getById(id);

      response.json({ message: 'Success', music });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
