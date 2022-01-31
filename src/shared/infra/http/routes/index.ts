import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.route';
import usersRouter from '@modules/users/infra/http/routes/users.route';
import passwordRouter from '@modules/users/infra/http/routes/password.route';
import profileRouter from '@modules/users/infra/http/routes/profile.route';
import providersRouter from '@modules/appointments/infra/http/routes/providers.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
