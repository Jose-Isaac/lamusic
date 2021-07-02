import { Request, Response } from 'express';
import { GenreBusiness } from '../business/GenreBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class GenreController {
  async create(request: Request, response: Response) {
    try {
      const { name } = request.body;

      const genreBusiness = new GenreBusiness();
      const genre = await genreBusiness.create(name);

      return response.json({ message: 'Success', genre });
    } catch (error) {
      return response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
