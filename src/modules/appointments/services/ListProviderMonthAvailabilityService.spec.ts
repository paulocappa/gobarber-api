import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService =
      new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the month availability from a provider', async () => {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    await Promise.all(
      hours.map(async hour => {
        await fakeAppointmentsRepository.create({
          provider_id: 'user1',
          user_id: 'user',
          date: new Date(2022, 1, 2, hour, 0, 0, 0),
        });
      }),
    );

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user',
      date: new Date(2022, 1, 4, 14, 0, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user1',
      year: 2022,
      month: 2,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 2, available: false },
        { day: 4, available: true },
      ]),
    );
  });
});
