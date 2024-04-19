import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { join } from 'path';
import { randomBytes } from 'crypto';
import * as sharp from 'sharp';

@Injectable()
export class ResizeImagesPipe implements PipeTransform {
  async transform(files: Express.Multer.File[], metadata: ArgumentMetadata) {
    for (let file of files) {
      const randomStr = randomBytes(32).toString('hex');
      file.filename = join('/upload', `${randomStr}-${Date.now()}.jpeg`);
      sharp(file.buffer)
        .resize(600, 300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(join(__dirname, '..', '..', '..', 'public', file.filename));
    }
    return files;
  }
}
