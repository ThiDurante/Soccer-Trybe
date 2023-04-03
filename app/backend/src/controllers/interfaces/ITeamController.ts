import { NextFunction, Request, Response } from 'express';

export interface ITeam {
  teamName: string
}

export interface IteamWithId extends ITeam {
  id: number
}

export interface ITeamController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
