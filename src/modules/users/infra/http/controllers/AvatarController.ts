import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id, file } = req;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id,
      userAvatarFilename: file.filename,
    });

    delete user.password;

    return res.json(user);
  }
}

export default AvatarController;
