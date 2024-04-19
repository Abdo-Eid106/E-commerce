import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Rate from '../entities/rate.entity';

@Injectable()
export class RateRepository {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepo: Repository<Rate>,
  ) {}

  createOne(userId: number, productId: number, val: number) {
    const rate = this.rateRepo.create({ userId, productId, rate: val });
    return this.rateRepo.save(rate);
  }

  fineOne(userId: number, productId: number) {
    return this.rateRepo.findOne({ where: { userId, productId } });
  }

  async findOneAndDelete(data: Partial<Rate>) {
    const rate = await this.rateRepo.findOne({ where: new Object(data) });
    if (rate) return this.rateRepo.remove(rate);
    return null;
  }
}
