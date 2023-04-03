import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchesModel';
import IMatchesService, { goals } from './interfaces/IMatchesService';

export default class MatchesService implements IMatchesService {
  private matchesModel: ModelStatic<MatchModel> = MatchModel;

  async getAll(): Promise<MatchModel[]> {
    const allMatches = await this.matchesModel.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ] });
    return allMatches;
  }

  async updateFinished(id: number): Promise<void> {
    const match = await this.findByPk(id);
    if (match) {
      await this.matchesModel.update({ inProgress: false }, { where: { id } });
    } else {
      throw new Error('Match not found');
    }
  }

  async updateInProgress(id: number, goalsP: goals): Promise<void> {
    const match = await this.findByPk(id);
    if (match) {
      await this.matchesModel.update({
        homeTeamGoals: goalsP.homeTeamGoals,
        awayTeamGoals: goalsP.awayTeamGoals,
      }, { where: { id } });
    } else {
      throw new Error('Match not found');
    }
  }

  async findByPk(id: number): Promise<MatchModel | null> {
    const match = await this.matchesModel.findByPk(id);
    return match?.dataValues;
  }

  async insert(match: MatchModel): Promise<MatchModel | false> {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals } = match;
    const team1 = await this.findByPk(Number(match.homeTeamId));
    const team2 = await this.findByPk(Number(match.awayTeamId));
    if (team1 && team2) {
      const createdMatch = await this.matchesModel.create({
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return createdMatch;
    }
    return false;
  }
}
