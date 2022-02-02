import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const hours = [11, 12];
    const [appointment1, appointment2] = await Promise.all(
      hours.map(async hour =>
        fakeAppointmentsRepository.create({
          provider_id: 'provider-id',
          user_id: 'user-id',
          date: new Date(2022, 1, 2, hour, 0, 0),
        }),
      ),
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider-id',
      day: 2,
      year: 2022,
      month: 2,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
