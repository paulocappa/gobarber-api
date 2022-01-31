import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

const server = express();

server.use(express.json());
server.use('/files', express.static(uploadConfig.uploadsFolder));
server.use(routes);

server.use(errors());

server.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

server.listen(3333, () => {
  console.log('Server running on port 3333');
});
