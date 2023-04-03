import { NextFunction, Request, Response } from 'express';

export interface ILogin {
  email: string
  password: string
}

export interface IUser {
  username: string
  role: string
  email: string
  password?: string
}

export interface IUserWithId extends IUser {
  id: number
}

export default interface IUserController {
  login(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  checkRole(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
