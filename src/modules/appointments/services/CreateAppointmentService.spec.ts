import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 1, 20, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      user_id: '654321',
      provider_id: '123456',
      date: new Date(2022, 1, 20, 14),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same date/time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 1, 20, 12).getTime();
    });

    const appointmentDate = new Date(2022, 1, 20, 14);

    await createAppointmentService.execute({
      user_id: '654321',
      provider_id: '123456',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        user_id: '654321',
        provider_id: '123456',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 1, 20, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: '654321',
        provider_id: '123456',
        date: new Date(2022, 1, 20, 8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 1, 20, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: '123456',
        provider_id: '123456',
        date: new Date(2022, 1, 20, 14),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8AM and after 5PM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 1, 20, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        user_id: '654321',
        provider_id: '123456',
        date: new Date(2022, 1, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        user_id: '654321',
        provider_id: '123456',
        date: new Date(2022, 1, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
