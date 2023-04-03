import { ILogin } from '../controllers/interfaces/IUserController';
import Email from './Email';

type validateResponse = {
  message: string
};

export default class Validations {
  private okMessage: validateResponse;
  private missingFieldsMessage: validateResponse;
  private invalidField: validateResponse;
  constructor() {
    this.okMessage = { message: 'Ok' };
    this.missingFieldsMessage = { message: 'All fields must be filled' };
    this.invalidField = { message: 'Invalid email or password' };
  }

  login(user: ILogin): validateResponse {
    if (!user.email || !user.password) {
      return this.missingFieldsMessage;
    }
    return this.okMessage;
  }

  checkFields(user: ILogin): validateResponse {
    const verifyPassword = user.password.length > 6;
    const verfyEmail = new Email(user.email).validate();

    if (verfyEmail && verifyPassword) {
      return this.okMessage;
    }
    return this.invalidField;
  }
}
