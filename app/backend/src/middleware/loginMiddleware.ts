import { NextFunction, Request, Response } from 'express';
import Validations from '../classes/Validations';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const validateUser = new Validations().login(user);
  if (validateUser.message.includes('filled')) {
    return res.status(400).json(validateUser);
  }
  const checkFields = new Validations().checkFields(user);
  if (checkFields.message.includes('Invalid')) {
    return res.status(401).json(checkFields);
  }
  next();
};

export default loginMiddleware;
