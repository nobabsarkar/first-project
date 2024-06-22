/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode.simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;

    message = 'Validation Error';
  } else if (err?.name === 'ValidationError') {
    // console.log('ami mongoose er validation err');
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplefiedError = handleCastError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplefiedError = handleDuplicateError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/*
  pattern

  success
  message
  errorSources:[
    path:'',
    message:''
  ]
  stack

*/
