import { BaseError } from './BaseError';

export class MissingDependenciesError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
