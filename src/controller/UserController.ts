import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

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

      // TODO gerar token
      response.json({ message: 'Success', token });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }
  }
}
