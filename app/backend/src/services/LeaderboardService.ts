import Matches from '../database/models/MatchesModel';
import ILeaderboardService, { leaderBoard } from './interfaces/ILeaderboardService';
import MatchesService from './MatchesService';
import IMatchesService from './interfaces/IMatchesService';
import { ITeamService } from './interfaces/ITeamService';
import TeamService from './TeamService';

export default class LeaderboardService implements ILeaderboardService {
  private _matchesService: IMatchesService;
  private _teamService: ITeamService;
  constructor() {
    this._matchesService = new MatchesService();
    this._teamService = new TeamService();
  }

  async getAllTeamsFull(): Promise<leaderBoard[]> {
    const homeTeams = await this.getAllTeamsHome();
    const awayTeams = await this.getAllTeamsAway();
    const fullTeams = LeaderboardService.sumAllTeams(homeTeams, awayTeams);
    const fullTeamsWithEff = fullTeams.map((fullTeam) => {
      const newFullTeamWithEff = fullTeam;
      newFullTeamWithEff.efficiency = LeaderboardService.efficiencyCalculator(fullTeam);
      return newFullTeamWithEff;
    });
    const sortedFullTeamsWithEff = LeaderboardService.sortByBestTeam(fullTeamsWithEff);
    return sortedFullTeamsWithEff;
  }

  async getAllTeamsHome(): Promise<leaderBoard[]> {
    const allTeams = await this._teamService.getAll();
    const promises = allTeams.map((team) => this.filterTeamStats(team.id, 'home'));
    const result = await Promise.all(promises);
    const sortedResult = LeaderboardService.sortByBestTeam(result);
    return sortedResult;
  }

  async getAllTeamsAway(): Promise<leaderBoard[]> {
    const allTeams = await this._teamService.getAll();
    const promises = allTeams.map((team) => this.filterTeamStats(team.id, 'away'));
    const result = await Promise.all(promises);
    const sortedResult = LeaderboardService.sortByBestTeam(result);
    return sortedResult;
  }

  async filterTeamStats(teamId: number, homeOrAway: 'home' | 'away'): Promise<leaderBoard> {
    const allMatches = await this._matchesService.getAll();
    const { teamName } = await this._teamService.getById(teamId);
    const filterMatchesWithTeam = allMatches
      .filter((match) => match[homeOrAway === 'home' ? 'homeTeamId' : 'awayTeamId'] === teamId
    && !match.inProgress);
    const teamStats = LeaderboardService
      .mountTeamStats(filterMatchesWithTeam, teamName, homeOrAway);
    teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
    teamStats.efficiency = LeaderboardService.efficiencyCalculator(teamStats);

    return teamStats;
  }

  static sumAllTeams(homeTeams: leaderBoard[], awayTeams: leaderBoard[])
    : leaderBoard[] {
    const allTeams = homeTeams.map((homeTeam) => {
      const away = awayTeams.find((awayTeam) => homeTeam.name === awayTeam.name) as leaderBoard;
      return {
        name: homeTeam.name,
        totalPoints: homeTeam.totalPoints + away.totalPoints,
        totalGames: homeTeam.totalGames + away.totalGames,
        totalVictories: homeTeam.totalVictories + away.totalVictories,
        totalDraws: homeTeam.totalDraws + away.totalDraws,
        totalLosses: homeTeam.totalLosses + away.totalLosses,
        goalsFavor: homeTeam.goalsFavor + away.goalsFavor,
        goalsOwn: homeTeam.goalsOwn + away.goalsOwn,
        goalsBalance: homeTeam.goalsBalance + away.goalsBalance,
        efficiency: 0,
      };
    });
    return allTeams;
  }

  static mountTeamStats(matches: Matches[], teamName: string, homeOrAway: 'home' | 'away') {
    const teamStatsMounted = {
      name: teamName,
      totalPoints: LeaderboardService.totalPoints(matches, homeOrAway),
      totalGames: LeaderboardService.totalGames(matches),
      totalVictories: LeaderboardService.totalVictories(matches, homeOrAway),
      totalDraws: LeaderboardService.totalDraws(matches),
      totalLosses: LeaderboardService.totalLosses(matches, homeOrAway),
      goalsFavor: LeaderboardService.goals(matches, 'favor', homeOrAway),
      goalsOwn: LeaderboardService.goals(matches, 'own', homeOrAway),
      goalsBalance: 1,
      efficiency: 1,
    };
    return teamStatsMounted;
  }

  static totalPoints(matches: Matches[], homeOrAway: 'home' | 'away'): number {
    const homeFull = 'homeTeamGoals';
    const awayFull = 'awayTeamGoals';
    return matches.reduce<number>((acc, curr) => {
      let newAcc: number = acc;
      if (curr.awayTeamGoals === curr.homeTeamGoals) newAcc += 1;
      if (
        curr[homeOrAway === 'home' ? homeFull : awayFull]
        > curr[homeOrAway === 'home' ? awayFull : homeFull]) newAcc += 3;
      return newAcc;
    }, 0);
  }

  static totalGames(matches: Matches[]): number {
    return matches.reduce<number>((acc, _curr) => {
      let counter: number = acc;
      counter += 1;
      return counter;
    }, 0);
  }

  static totalVictories(matches: Matches[], homeOrAway: 'home' | 'away'): number {
    const homeFull = 'homeTeamGoals';
    const awayFull = 'awayTeamGoals';
    return matches.reduce<number>((acc, curr) => {
      let newAcc = acc;
      if (curr[homeOrAway === 'home' ? homeFull : awayFull]
      > curr[homeOrAway === 'home' ? awayFull : homeFull]) newAcc += 1;
      return newAcc;
    }, 0);
  }

  static totalLosses(matches: Matches[], homeOrAway: 'home' | 'away'): number {
    const homeFull = 'homeTeamGoals';
    const awayFull = 'awayTeamGoals';
    return matches.reduce<number>((acc, curr) => {
      let newAcc = acc;
      if (curr[homeOrAway === 'home' ? homeFull : awayFull]
      < curr[homeOrAway === 'home' ? awayFull : homeFull]) newAcc += 1;
      return newAcc;
    }, 0);
  }

  static totalDraws(matches: Matches[]): number {
    return matches.reduce<number>((acc, curr) => {
      let newAcc: number = acc;
      if (curr.homeTeamGoals === curr.awayTeamGoals) newAcc += 1;
      return newAcc;
    }, 0);
  }

  static goals(matches: Matches[], favorOrOwn: 'favor' | 'own', homeOrAway: 'home' | 'away')
    : number {
    let favorOrOwnString: 'homeTeamGoals' | 'awayTeamGoals';
    if (homeOrAway === 'home') {
      favorOrOwnString = favorOrOwn === 'favor' ? 'homeTeamGoals' : 'awayTeamGoals';
    }
    if (homeOrAway === 'away') {
      favorOrOwnString = favorOrOwn === 'favor' ? 'awayTeamGoals' : 'homeTeamGoals';
    }
    return matches.reduce<number>((acc, curr) => {
      let newAcc = acc;
      newAcc += curr[favorOrOwnString];
      return newAcc;
    }, 0);
  }

  static sortByBestTeam(teams: leaderBoard[]) {
    return teams.sort((team1, team2) => {
      if (team1.totalPoints !== team2.totalPoints) {
        return team2.totalPoints - team1.totalPoints;
      }
      if (team1.goalsBalance !== team2.goalsBalance) {
        return team2.goalsBalance - team1.goalsBalance;
      }
      return team2.goalsFavor - team1.goalsFavor;
    });
  }

  static efficiencyCalculator(teamStats: leaderBoard) {
    return Number(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100).toFixed(2));
  }
}
