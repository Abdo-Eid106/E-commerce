import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Brand from '../entities/brand.entity';
import IRepository from 'src/repositories/repository';
import CreateBrandDto from '../dtos/create-brand.dto';

@Injectable()
export class BrandRepostory implements IRepository {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  createOne(data: CreateBrandDto) {
    const brand = this.brandRepo.create(data);
    return this.brandRepo.save(brand);
  }

  findAll() {
    return this.brandRepo.find();
  }

  findById(id: number) {
    return this.brandRepo.findOne({ where: { id } });
  }

  findOne(query: Partial<Brand>) {
    return this.brandRepo.findOne({ where: new Object(query) });
  }

  findMany(query: Partial<Brand>) {
    return this.brandRepo.find({ where: new Object(query) });
  }

  async findByIdAndUpdate(id: number, data: Partial<Brand>) {
    let brand = await this.findById(id);
    if (!brand) throw new NotFoundException('there is no brand with this id');
    brand = Object.assign(brand, data);
    return this.brandRepo.save(brand);
  }
}
