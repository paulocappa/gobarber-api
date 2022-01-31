import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req;
    const { name, email, old_password, password } = req.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return res.json(instanceToInstance(user));
  }
}

export default ProfileController;
