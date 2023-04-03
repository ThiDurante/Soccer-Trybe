import { NextFunction, Request, Response } from 'express';
import ILeaderboardService from '../services/interfaces/ILeaderboardService';
import ILeaderboardController from './interfaces/ILeaderboardController';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardService: ILeaderboardService;
  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardService.getAllTeamsHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllAway(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardService.getAllTeamsAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllFull(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardService.getAllTeamsFull();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
