import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema  } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;

    } catch (error) {
        if(error instanceof ZodError) {
            const errors = error.message

            throw new BadRequestException({
                message: 'Validation failed',
                errors: error.issues
            })
        }
      throw new BadRequestException('Validation failed');
    }
  }
}