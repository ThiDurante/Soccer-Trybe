import { NextFunction, Request, Response } from 'express';

export default interface ILeaderboardController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getAllAway(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getAllFull(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
