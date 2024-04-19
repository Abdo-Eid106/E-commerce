import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateCategoury from '../dtos/create-categoury.dto';
import Categoury from '../entities/categoury.entity';

@Injectable()
export class CategouryRepository {
  constructor(
    @InjectRepository(Categoury)
    private readonly repo: Repository<Categoury>,
  ) {}

  createOne(data: CreateCategoury) {
    const categoruy = this.repo.create(data);
    return this.repo.save(categoruy);
  }

  findOne(query: Partial<Categoury>) {
    return this.repo.findOne({ where: new Object(query) });
  }

  findAll() {
    return this.repo.find();
  }

  findMany(query: Partial<Categoury>) {
    return this.repo.find({ where: new Object(query) });
  }

  async deleteOne(query: Partial<Categoury>) {
    const categoury = await this.repo.findOne({ where: new Object(query) });
    return this.repo.remove(categoury);
  }

  async getPopular() {
    return this.repo
      .createQueryBuilder('categoury')
      .addSelect('categoury.id', 'id')
      .addSelect('categoury.name', 'name')
      .addSelect('categoury.photo', 'photo')
      .groupBy('categoury.id')
      .leftJoin('categoury.products', 'products')
      .addSelect('COUNT(products.id)', 'productsCount')
      .orderBy('productsCount', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
