import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/matches', matchesController.getAll.bind(matchesController))
  .patch(
    '/matches/:id/finish',
    authMiddleware,
    matchesController.updateFinished.bind(matchesController),
  ).patch(
    '/matches/:id',
    authMiddleware,
    matchesController.updateInProgress.bind(matchesController),
  ).post(
    '/matches',
    authMiddleware,
    matchesController.insert.bind(matchesController),
  );

export default matchesRouter;
