import { IteamWithId } from '../../controllers/interfaces/ITeamController';

export interface ITeamService {
  getAll(): Promise<IteamWithId[]>
  getById(id: number): Promise<IteamWithId>
}
