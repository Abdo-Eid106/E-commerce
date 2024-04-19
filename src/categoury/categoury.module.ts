import { Module } from '@nestjs/common';
import { CategouryController } from './categoury.controller';
import { CategouryRepository } from './repositories/categoury.repository';
import { CategouryService } from './categoury.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import Categoury from './entities/categoury.entity';
import Unique from './validators/Cateogoury-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Categoury]), UserModule],
  controllers: [CategouryController],
  providers: [CategouryService, Unique, CategouryRepository],
  exports: [CategouryService],
})
export class CategouryModule {}
