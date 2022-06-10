import { Request, Response, NextFunction } from 'express';
import AdminRepository from '../../typeorm/repositories/AdminRepository';

import AppError from '@shared/errors/AppError';

async function ensureValidAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const idSub = request.tokenSub.id;
  const adminRepository = new AdminRepository();
  request.tokenSub = {
    id: '',
  };

  const admin = await adminRepository.findById(idSub);

  if (!admin) {
    throw new AppError(
      'Esse usuário não tem permissão para acessar esse recurso.',
      403,
    );
  }

  return next();
}

export default ensureValidAdmin;
