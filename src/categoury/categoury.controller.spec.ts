import { Test, TestingModule } from '@nestjs/testing';
import { CategouryController } from './categoury.controller';

describe('CategouryController', () => {
  let controller: CategouryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategouryController],
    }).compile();

    controller = module.get<CategouryController>(CategouryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
