import { ModelStatic } from 'sequelize';
import { IteamWithId } from '../controllers/interfaces/ITeamController';
import TeamModel from '../database/models/TeamModel';
import { ITeamService } from './interfaces/ITeamService';

export default class TeamService implements ITeamService {
  private teamModel: ModelStatic<TeamModel> = TeamModel;

  public async getAll(): Promise<IteamWithId[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getById(id: number): Promise<IteamWithId> {
    const team = await this.teamModel.findOne({ where: { id } });
    if (!team) throw new Error('This team doesn\'t exists');
    return team;
  }
}
