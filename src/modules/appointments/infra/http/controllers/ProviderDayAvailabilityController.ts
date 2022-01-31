import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { day, month, year } = req.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await listProviderDayAvailabilityService.execute({
      provider_id: id,
      day,
      month,
      year,
    });

    return res.json(dayAvailability);
  }
}

export default ProviderDayAvailabilityController;
