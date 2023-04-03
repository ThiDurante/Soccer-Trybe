import { Router } from 'express';
import loginMiddleware from '../middleware/loginMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import UserControler from '../controllers/UserController';
import UserService from '../services/UserService';

const userRouter = Router();
const userService = new UserService();
const userController = new UserControler(userService);

userRouter.post('/login', loginMiddleware, userController.login.bind(userController));
userRouter.get('/login/role', authMiddleware, userController.checkRole.bind(userController));

export default userRouter;
