import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { randomBytes } from 'crypto';

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) return file;
    const randomStr = randomBytes(32).toString('hex');
    file.filename = join('/upload', `${randomStr}-${Date.now()}.jpeg`);
    sharp(file.buffer)
      .resize(600, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(join(__dirname, '..', '..', '..', 'public', file.filename));
    return file;
  }
}
