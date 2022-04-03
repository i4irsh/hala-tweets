import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import UsersRoute from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          userName: 'a@email.com',
        },
        {
          _id: 'alskdjfhg',
          userName: 'b@email.com',
        },
        {
          _id: 'zmxncbv',
          userName: 'c@email.com',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:userName', () => {
    it('response findOne User', async () => {
      const userName = 'a@email.com';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        userName: 'a@email.com'
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userName}`).expect(200);
    });
  });
});
