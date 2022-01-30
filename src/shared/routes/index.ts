import { Router } from 'express';
import appointmentsRouter from './appointments.route';
import sessionsRouter from './sessions.route';
import usersRouter from './users.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
