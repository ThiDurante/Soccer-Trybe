import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/leaderboard/home',
  leaderboardController.getAll.bind(leaderboardController),
)
  .get(
    '/leaderboard/away',
    leaderboardController.getAllAway.bind(leaderboardController),
  )
  .get(
    '/leaderboard',
    leaderboardController.getAllFull.bind(leaderboardController),
  );

export default leaderboardRouter;
