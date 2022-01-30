import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/http/routes/appointments.route';
import sessionsRouter from '@modules/users/http/routes/sessions.route';
import usersRouter from '@modules/users/http/routes/users.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
