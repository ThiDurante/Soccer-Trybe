import { ModelStatic } from 'sequelize';
import { ILogin } from '../controllers/interfaces/IUserController';
import UserModel from '../database/models/UserModel';
import IUserService from './interfaces/IUserService';

export default class UserService implements IUserService {
  private userModel: ModelStatic<UserModel> = UserModel;

  async verifyUserOnDb(user: ILogin): Promise<false | UserModel> {
    const userDb = await this.userModel.findOne({ where: { email: user.email } });
    if (userDb === null) {
      return false;
    }
    return userDb;
  }
}
