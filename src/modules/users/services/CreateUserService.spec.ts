import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('afonso@gmail.com');
  });

  it('should not be able to create a new user with existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    expect(
      createUserService.execute({
        name: 'Fake do Afonso',
        email: 'afonso@gmail.com',
        password: 'afonsofake123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
