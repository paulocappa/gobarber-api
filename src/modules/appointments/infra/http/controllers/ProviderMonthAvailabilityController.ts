import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { month, year } = req.body;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const monthAvailability =
      await listProviderMonthAvailabilityService.execute({
        provider_id: id,
        month,
        year,
      });

    return res.json(monthAvailability);
  }
}

export default ProviderMonthAvailabilityController;
