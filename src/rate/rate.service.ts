import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { RateRepository } from './repositories/rate.repository';

@Injectable()
export class RateService {
  constructor(
    private readonly productService: ProductService,
    private readonly rateRepo: RateRepository,
  ) {}

  async putRate(userId: number, productId: number, val: number) {
    const product = await this.productService.getById(productId);
    if (!product) {
      throw new NotFoundException({
        status: 'fail',
        error: { message: 'there is no product with this id' },
      });
    }
    await this.rateRepo.findOneAndDelete({ productId, userId });
    return this.rateRepo.createOne(userId, productId, val);
  }

  async removeRate(userId: number, productId: number) {
    return this.rateRepo.findOneAndDelete({ productId, userId });
  }

  async getRate(userId: number, productId: number) {
    return this.rateRepo.fineOne(userId, productId);
  }
}
