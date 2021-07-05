import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class UserController {
  public async signup(request: Request, response: Response) {
    try {
      const { name, nickname, email, password } = request.body;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signup({
        name,
        nickname,
        email,
        password,
      });

      response.json({ message: 'Success', token });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.login({ email, password });

      response.json({ message: 'Success', token });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
