import { NextFunction, Request, Response } from 'express';
import Matches from '../database/models/MatchesModel';
import IMatchesService from '../services/interfaces/IMatchesService';
import IMatchesController from './interfaces/IMatchesController';

export default class MatchesController implements IMatchesController {
  _matchesService: IMatchesService;
  constructor(matchesService: IMatchesService) {
    this._matchesService = matchesService;
  }

  async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const allMatches = await this._matchesService.getAll();
    const { query } = req;
    if (query.inProgress) {
      const filtered = MatchesController.filterQuery(allMatches, query as { inProgress: string });
      return res.status(200).json(filtered);
    }
    return res.status(200).json(allMatches);
  }

  static filterQuery(matches: Matches[], query: { inProgress: string }): Matches[] {
    if (query.inProgress === 'true') {
      const filteredAllMatches = matches.filter((match) => match.inProgress);
      return filteredAllMatches;
    }
    if (query.inProgress === 'false') {
      const filteredAllMatches = matches.filter((match) => !match.inProgress);
      return filteredAllMatches;
    }
    return matches;
  }

  async updateFinished(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this._matchesService.updateFinished(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateInProgress(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      const goals = req.body;
      await this._matchesService.updateInProgress(Number(id), goals);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const match = req.body;
      if (match.homeTeamId === match.awayTeamId) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const createdMatch = await this._matchesService.insert(match);
      if (createdMatch) {
        return res.status(201).json(createdMatch);
      }
      return res.status(404).json({ message: 'There is no team with such id!' });
    } catch (error) {
      next(error);
    }
  }
}
