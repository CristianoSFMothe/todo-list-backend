/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isUuid(value)) {
      throw new BadRequestException(
        'O identificador informado é inválido. Verifique e tente novamente.',
      );
    }
    return value;
  }
}
