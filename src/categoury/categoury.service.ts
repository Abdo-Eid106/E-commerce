import { Injectable, NotFoundException } from '@nestjs/common';
import { CategouryRepository } from './repositories/categoury.repository';
import CreateCategoury from './dtos/create-categoury.dto';

@Injectable()
export class CategouryService {
  constructor(private readonly repo: CategouryRepository) {}

  async create(data: CreateCategoury) {
    return this.repo.createOne(data);
  }

  findByName(name: string) {
    return this.repo.findOne({ name });
  }

  async deleteByName(name: string) {
    const categoury = await this.findByName(name);
    if (!categoury)
      throw new NotFoundException('there is no categoury with this name');
    return this.repo.deleteOne({ name });
  }

  async findAll() {
    return this.repo.findAll();
  }

  async getPopular() {
    return this.repo.getPopular();
  }
}
