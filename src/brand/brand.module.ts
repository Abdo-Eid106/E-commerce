import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepostory } from './repositories/brand.repository';
import Brand from './entities/brand.entity';
import UniqueBrandName from './dtos/unique-brand-name.validator';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, UniqueBrandName, BrandRepostory],
  controllers: [BrandController],
  exports: [BrandService],
})
export class BrandModule {}
