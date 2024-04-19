import { ValidationPipe, BadRequestException } from '@nestjs/common';

const exceptionFactory = (errors) => {
  const formattedErrors = {};

  errors.forEach((error: any) => {
    const property = error.property;
    const constraints = error.constraints;

    formattedErrors[property] = Object.values(constraints);
  });

  return new BadRequestException({
    errors: formattedErrors,
    type: 'Bad Request',
    statusCode: 400,
  });
};

const CustomeValidatonPipe = new ValidationPipe({
  exceptionFactory,
  transform: true,
  whitelist: true,
});
export default CustomeValidatonPipe;
