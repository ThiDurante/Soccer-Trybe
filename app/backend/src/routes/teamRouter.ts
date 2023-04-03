import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/teams', teamController.getAll.bind(teamController));
teamRouter.get('/teams/:id', teamController.getById.bind(teamController));

export default teamRouter;
