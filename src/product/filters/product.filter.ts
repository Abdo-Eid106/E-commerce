import {
  ArgumentsHost,
  ExceptionFilter,
  Injectable,
  Catch,
} from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CategouryService } from 'src/categoury/categoury.service';
import { ProductService } from '../product.service';
import { Request, Response } from 'express';

@Catch(Error)
@Injectable()
export default class ProductFilter implements ExceptionFilter {
  constructor(
    private categouryService: CategouryService,
    private brandService: BrandService,
    private productService: ProductService,
  ) {}

  async catch(exception: any, host: ArgumentsHost) {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();

    let data: any = { layout: 'admin/layout'};
    data.categouries = await this.categouryService.findAll();
    data.brands = await this.brandService.findAll();
    data.errors = exception.response.errors;
    Object.assign(data, req.body);

    const template =
      req.originalUrl == '/products' ? 'admin/add-product' : 'admin/edit-product';
    if (template == 'admin/edit-product') {
      const product = await this.productService.getById(
        parseInt(req.params.id),
      );
      data.product = product;
    }
    res.render(template, data);
  }
}
