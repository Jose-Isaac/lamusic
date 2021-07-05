import { Request, Response } from 'express';
import { AlbumBusiness } from '../business/AlbumBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class AlbumController {
  async create(request: Request, response: Response) {
    try {
      const { name } = request.body;

      const albumBusiness = new AlbumBusiness();
      const album = await albumBusiness.create(name);

      response.json({ message: 'Success', album });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
