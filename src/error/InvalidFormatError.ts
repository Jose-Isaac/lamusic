import { BaseError } from './BaseError';

export class InvalidFormatError extends BaseError {
  constructor(message: string) {
    super(message, 422);
  }
}
