import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class UserController {
  public async signup(request: Request, response: Response) {
    try {
      const { name, nickname, email, password } = request.body;

      console.log(name);

      const userBusiness = new UserBusiness();
      const data = await userBusiness.signup({
        name,
        nickname,
        email,
        password,
      });

      response.json({ message: 'Success', token: data.token, user: data.user });
    } catch (error) {
      response
        .status(error.code || 500)
        .send({ message: error.message || error.sqlMessage });
    }

    await BaseDatabase.destroyConnection();
  }

  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const userBusiness = new UserBusiness();
      const data = await userBusiness.login({ email, password });

      response.json({ message: 'Success', token: data.token, user: data.user });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
