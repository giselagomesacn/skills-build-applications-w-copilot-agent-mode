import express from 'express';
import type { ErrorRequestHandler } from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();

const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const listResource = (load: () => Promise<unknown[]>) => async (
  _request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  try {
    response.json(await load());
  } catch (error) {
    next(error);
  }
};

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', listResource(() => User.find().lean().exec()));
app.get('/api/teams/', listResource(() => Team.find().lean().exec()));
app.get('/api/activities/', listResource(() => Activity.find().lean().exec()));
app.get('/api/leaderboard/', listResource(() => Leaderboard.find().sort({ points: -1 }).lean().exec()));
app.get('/api/workouts/', listResource(() => Workout.find().lean().exec()));

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'An unexpected server error occurred.' });
};

app.use(errorHandler);

export default app;
