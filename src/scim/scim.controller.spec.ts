import { Test, TestingModule } from '@nestjs/testing';
import { UserListCt } from './scim.controller';
import { SCIMService } from './scim.service';

describe('AppController', () => {
  let appController: UserListCt;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserListCt],
      providers: [SCIMService],
    }).compile();

    appController = app.get<UserListCt>(UserListCt);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getActiveUser()).toBe('Hello World!');
    });
  });
});
