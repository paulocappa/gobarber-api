import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default usersRouter;
