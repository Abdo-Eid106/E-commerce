import { Test, TestingModule } from '@nestjs/testing';
import { CategouryService } from './categoury.service';

describe('CategouryService', () => {
  let service: CategouryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategouryService],
    }).compile();

    service = module.get<CategouryService>(CategouryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
