import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import Coupon from '../entities/coupon.entity';

@Injectable()
export class CouponRepository {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
  ) {}

  createOne(data: Partial<Coupon>) {
    const coupon = this.repo.create(data);
    return this.repo.save(coupon);
  }

  findOne(data: any) {
    data.endDate = MoreThan(new Date(Date.now()));
    return this.repo.findOne({ where: new Object(data) });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
