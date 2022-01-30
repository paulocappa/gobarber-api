import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    const auth = await authenticateUserService.execute({
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate user with a wrong password', async () => {
    await createUserService.execute({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'afonso@gmail.com',
        password: 'afonso123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'afonso@gmail.com',
        password: 'afonso123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
