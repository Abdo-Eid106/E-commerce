import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import CreateProduct from '../dtos/create-product.dto';
import Product from '../entities/product.entity';
import EditProductDto from '../dtos/edit-product.dto';
import QueryDto from '../dtos/query.dto';

@Injectable()
export class ProductRepository {
  private productAttrs: string[];
  private categouryAttrs: string[];
  private qb: SelectQueryBuilder<Product>;

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private brandService: BrandService,
  ) {
    this.productAttrs = this.productRepo.metadata.columns.map(
      (column) => column.propertyName,
    );
    this.categouryAttrs = ['id', 'name', 'photo'];
    this.qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoin('product.rates', 'rates')
      .leftJoin('product.categoury', 'categoury')
      .leftJoin('product.brand', 'brand')
      .groupBy('id');

    for (let attr of this.productAttrs)
      this.qb.addSelect('product.' + attr, attr);
    for (let attr of this.categouryAttrs) {
      this.qb.addSelect(
        'categoury.' + attr,
        'categoury' + attr[0].toUpperCase() + attr.slice(1),
      );
      this.qb.addSelect(
        'brand.' + attr,
        'brand' + attr[0].toUpperCase() + attr.slice(1),
      );
    }
    this.qb.addSelect('AVG(rates.rate)', 'rate');
  }

  createOne(data: CreateProduct) {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  findById(id: number): any {
    return this.productRepo.findOne({ where: { id } });
  }

  findOne(query: Partial<Product>) {
    return this.productRepo.findOne({ where: new Object(query) });
  }

  findAll() {
    return this.productRepo.find({ where: {} });
  }

  async findMany(query: QueryDto) {
    const qb = this.qb.clone();
    if (query.categoury) {
      qb.where('categouryId = :categouryId', {
        categouryId: query.categoury,
      });
    }

    if (query.brand) {
      const brands = await this.brandService.findMany({ name: query.brand });
      qb.andWhere('product.brandId = :brandId', {
        brandId: brands.length ? brands[0].id : -1,
      });
    }

    if (query.search) {
      qb.andWhere(
        'product.name LIKE :search OR product.description LIKE :search',
        { search: `%${query.search}%` },
      );
    }

    if (query.lowPrice) {
      const { lowPrice } = query;
      qb.andWhere('product.price >= :lowPrice', {
        lowPrice,
      });
    }

    if (query.highPrice) {
      const { highPrice } = query;
      qb.andWhere('product.price <= :highPrice', {
        highPrice,
      });
    }

    if (query.sort) {
      if (query.sort == 'price-low-to-high') qb.orderBy('product.price', 'ASC');
      else if (query.sort == 'price-high-to-low')
        qb.orderBy('product.price', 'DESC');
      else if (query.sort == 'rate-low-to-high') qb.orderBy('rate', 'ASC');
      else if (query.sort == 'rate-high-to-low') qb.orderBy('rate', 'DESC');
      else qb.orderBy('product.createdAt', 'ASC');
    }

    if (query.paginate)
      qb.offset((query.page - 1) * query.limit).limit(query.limit);
    return qb.getRawMany();
  }

  async findByIdAndUpdate(id: number, data: EditProductDto) {
    if (data.photos.length == 0) delete data.photos;
    let product = await this.productRepo.findOne({ where: { id } });
    if (!product) return;
    product = Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async deleteById(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException('there is no product with this id');
    return this.productRepo.remove(product);
  }

  getLatest() {
    return this.productRepo.find({ order: { createdAt: 'DESC' }, take: 10 });
  }
}
