import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { ProductModule } from 'src/product/product.module';
import { RateRepository } from './repositories/rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import Rate from './entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), UserModule, ProductModule],
  controllers: [RateController],
  providers: [RateRepository, RateService],
  exports: [RateService],
})
export class RateModule {}
