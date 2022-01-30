import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashPRovider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashPRovider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashPRovider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Afonso Culpado',
      email: 'culpado.afonso@gmail.com',
    });

    expect(updatedUser.name).toBe('Afonso Culpado');
    expect(updatedUser.email).toBe('culpado.afonso@gmail.com');
  });

  it('should not be able to update the email to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Paulo',
      email: 'paulo@gmail.com',
      password: 'paulo123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Paulo Messias',
        email: 'afonso@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Afonso Culpado',
      email: 'culpado.afonso@gmail.com',
      old_password: 'afonso123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update profile with non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'Afonso Culpado',
        email: 'culpado.afonso@gmail.com',
        old_password: 'afonso123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without the old_password field', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Afonso Culpado',
        email: 'culpado.afonso@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Afonso Culpado',
        email: 'culpado.afonso@gmail.com',
        old_password: 'umasenhaqualquer',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
