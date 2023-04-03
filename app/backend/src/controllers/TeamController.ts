import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../services/interfaces/ITeamService';
import { ITeamController } from './interfaces/ITeamController';

export default class TeamController implements ITeamController {
  private _teamService: ITeamService;
  constructor(
    teamService: ITeamService,
  ) {
    this._teamService = teamService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const allTeams = await this._teamService.getAll();
      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const team = await this._teamService.getById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
