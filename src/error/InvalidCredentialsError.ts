import { BaseError } from './BaseError';

export class InvalidCredentialsError extends BaseError {
  constructor(message: string) {
    super(message, 403);
  }
}
