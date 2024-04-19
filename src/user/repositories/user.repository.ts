import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  creatOne(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findOne(data: Partial<User>) {
    return this.repo.findOne({ where: new Object(data) });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findByIdAndUpdate(id: number, data: Partial<User>) {
    let user = await this.findById(id);
    user = Object.assign(user, data);
    return this.repo.save(user);
  }
}
