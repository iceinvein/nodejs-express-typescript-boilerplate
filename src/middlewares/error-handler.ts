import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

function errorHandler(err: HttpException, _req: Request, res: Response, next: NextFunction): void {
  const error = { ...err };

  error.message = err.message;

  res.status(error.status || 500).json({
    error: error.message || 'Server Error',
  });

  next();
}

export default errorHandler;
