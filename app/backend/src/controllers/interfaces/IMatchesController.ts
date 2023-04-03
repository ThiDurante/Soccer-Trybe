import { NextFunction, Request, Response } from 'express';

export interface IMatches {
  homeTeamId: number
  homeTeamGoals: number
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }

}

export default interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateFinished(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateInProgress(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  insert(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
