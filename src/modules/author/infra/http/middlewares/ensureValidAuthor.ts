import { Request, Response, NextFunction } from 'express';
import AuthorRepository from '../../typeorm/repositories/AuthorRepository';

import AppError from '@shared/errors/AppError';

async function ensureValidAuthor(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const idSub = request.tokenSub.id;
  const authorRepository = new AuthorRepository();
  request.tokenSub = {
    id: '',
  };

  const author = await authorRepository.findById(idSub);

  if (!author) {
    throw new AppError(
      'Esse usuário não tem permissão para acessar esse recurso.',
      403,
    );
  }

  request.author = {
    id: author.id,
  };

  return next();
}

export default ensureValidAuthor;
