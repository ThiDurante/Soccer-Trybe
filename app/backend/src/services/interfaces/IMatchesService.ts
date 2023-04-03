import MatchModel from '../../database/models/MatchesModel';

export type goals = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

export default interface IMatchesService {
  getAll(): Promise<MatchModel[]>
  updateFinished(id: number): void
  updateInProgress(id: number, goals: goals): void
  findByPk(id: number): Promise<MatchModel | null>
  insert(match: MatchModel): Promise<MatchModel | false>
}
