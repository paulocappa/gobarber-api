import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      userAvatarFilename: 'newfile.jpeg',
    });

    expect(user.avatar).toBe('newfile.jpeg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-id',
        userAvatarFilename: 'newfile.jpeg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileFn = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Afonso',
      email: 'afonso@gmail.com',
      password: 'afonso123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      userAvatarFilename: 'newfile.jpeg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      userAvatarFilename: 'newfile2.jpeg',
    });

    expect(deleteFileFn).toHaveBeenCalledWith('newfile.jpeg');

    expect(user.avatar).toBe('newfile2.jpeg');
  });
});
