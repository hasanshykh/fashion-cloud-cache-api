import { Response } from 'express';
import { NotFoundResponse, InternalErrorResponse, BadRequestResponse } from './app-response';

enum ErrorType {
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequest',
}
const notFound: Array<ErrorType> = [ErrorType.NOT_FOUND, ErrorType.NO_ENTRY, ErrorType.NO_DATA];

export abstract class AppError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type);
  }

  public static handle(err: AppError, res: Response): void {
    if (notFound.includes(err.type)) {
      new NotFoundResponse(res);
      return;
    }

    if (err.type === ErrorType.BAD_REQUEST) {
      new BadRequestResponse(res, err.message);
      return;
    }

    const message = err.message;
    new InternalErrorResponse(res, message);
  }
}

export class InternalError extends AppError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
