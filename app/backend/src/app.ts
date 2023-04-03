/* eslint-disable import/extensions */
import * as express from 'express';
import errorMiddleware from './middleware/errorMiddleware';
import leaderboardRouter from './routes/teamRouter';
import matchesRouter from './routes/matchesRouter';
import teamRouter from './routes/teamRouter';
import userRouter from './routes/userRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(errorMiddleware);
    this.app.use(teamRouter);
    this.app.use(userRouter);
    this.app.use(matchesRouter);
    this.app.use(leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
