import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUserDtoMock, userPublicMock } from '../__mock__/user.mock';

describe('UserController - createUser', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create and return a new user', async () => {
    jest.spyOn(userService, 'createUser').mockResolvedValue(userPublicMock);

    const result = await controller.create(createUserDtoMock);

    expect(userService.createUser).toHaveBeenCalledWith(createUserDtoMock);
    expect(result).toEqual(userPublicMock);
  });
});
