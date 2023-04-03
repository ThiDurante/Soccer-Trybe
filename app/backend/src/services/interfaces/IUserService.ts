import { ILogin } from '../../controllers/interfaces/IUserController';
import UserModel from '../../database/models/UserModel';

export default interface IUserService {
  verifyUserOnDb(user: ILogin): Promise<UserModel | false>
}
