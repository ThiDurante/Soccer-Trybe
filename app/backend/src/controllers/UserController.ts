import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import Jwt from '../classes/Jwt';
// import Validations from '../classes/Validations';
import IUserService from '../services/interfaces/IUserService';
import IUserController from './interfaces/IUserController';

export default class UserControler implements IUserController {
  private _userService: IUserService;
  constructor(
    userService: IUserService,
  ) {
    this._userService = userService;
  }

  // eslint-disable-next-line max-lines-per-function
  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = req.body;
      console.log(req.body);

      // const validateUser = new Validations().login(user);
      // if (validateUser.message.includes('filled')) {
      //   return res.status(400).json(validateUser);
      // }
      // const checkFields = new Validations().checkFields(user);
      // if (checkFields.message.includes('Invalid')) {
      //   return res.status(401).json(checkFields);
      // }
      const checkUserExists = await this._userService.verifyUserOnDb(user);

      // const validatePassword = bcrypt.compareSync(user.password, checkUserExists.password || '');

      if (checkUserExists && bcrypt
        .compareSync(user.password, checkUserExists.password || '')) {
        const token = new Jwt().generate(checkUserExists.dataValues);
        return res.status(200).json({ token });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
      next(error);
    }
  }

  async checkRole(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user } = req.body;
      const checkUserOnDb = await this._userService.verifyUserOnDb(user);
      if (checkUserOnDb) {
        return res.status(200).json({ role: user.role });
      }
    } catch (error) {
      next(error);
    }
  }
}
