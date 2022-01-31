import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from a provider', async () => {
    const hours = [11, 12];
    await Promise.all(
      hours.map(async hour => {
        await fakeAppointmentsRepository.create({
          provider_id: 'user1',
          date: new Date(2022, 1, 2, hour, 0, 0),
        });
      }),
    );

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2022, 1, 2, 10).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user1',
      day: 2,
      year: 2022,
      month: 2,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: true },
      ]),
    );
  });
});
