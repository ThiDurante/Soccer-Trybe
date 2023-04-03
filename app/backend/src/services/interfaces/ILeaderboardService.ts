export type leaderBoard = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

export default interface ILeaderboardService {
  filterTeamStats(teamId: number, homeOrAway: 'home' | 'away'): Promise<leaderBoard>
  getAllTeamsHome(): Promise<leaderBoard[]>
  getAllTeamsAway(): Promise<leaderBoard[]>
  getAllTeamsFull(): Promise<leaderBoard[]>
}
