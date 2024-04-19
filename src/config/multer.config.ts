import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const multerOptions = () => {
  const storage = memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (!file) cb(new BadRequestException('the file is required'), null);
    if (!file.mimetype.startsWith('image'))
      cb(new BadRequestException('the uploaded file should be an image'), null);
    cb(null, true);
  };

  const options: MulterOptions = {
    storage,
    fileFilter,
  };
  return options;
};