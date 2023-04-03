import { NextFunction, Request, Response } from 'express';
import { IUserWithId } from '../controllers/interfaces/IUserController';
import Jwt from '../classes/Jwt';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const jwt = new Jwt();
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token) as IUserWithId;
    delete decoded.password;
    req.body.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default authMiddleware;
