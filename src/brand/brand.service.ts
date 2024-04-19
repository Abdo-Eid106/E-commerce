import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandRepostory } from './repositories/brand.repository';
import Brand from './entities/brand.entity';
import CreateBrandDto from './dtos/create-brand.dto';
import UpdateBrandDto from './dtos/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    public repo: Repository<Brand>,
    private brandRepostory: BrandRepostory,
  ) {}

  createBrand(data: CreateBrandDto) {
    return this.brandRepostory.createOne(data);
  }

  findByName(name: string) {
    return this.brandRepostory.findOne({ name });
  }

  findAll() {
    return this.brandRepostory.findAll();
  }

  findMany(query: Partial<Brand>) {
    return this.brandRepostory.findMany(query);
  }

  async updateBrand(id: number, data: UpdateBrandDto) {
    let brand = await this.repo.findOne({ where: { id } });
    if (!brand) throw new NotFoundException('there is no brand with this id');
    brand = Object.assign(brand, data);
    return this.repo.save(brand);
  }

  getBrandById(id: number) {
    return this.brandRepostory.findById(id);
  }
}
