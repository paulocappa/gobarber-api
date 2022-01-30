import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../../../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { user_id, file } = req;

    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id,
      userAvatarFilename: file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouter;
