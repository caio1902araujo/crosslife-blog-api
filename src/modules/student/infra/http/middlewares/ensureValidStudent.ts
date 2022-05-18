import { Request, Response, NextFunction } from 'express';
import StudentRepository from '../../typeorm/repositories/StudentRepository';

import AppError from '@shared/errors/AppError';

async function ensureValidStudent (request: Request, response: Response, next: NextFunction): Promise<void>{
	const idSub = request.tokenSub.id;
  const studentRepository = new StudentRepository();

	request.tokenSub = {
    id: ''
  };

  const student = await studentRepository.findById(idSub);

  if(!student){
    throw new AppError('Esse usuário não tem permissão para acessar esse recurso.', 401);
  }

  request.student = {
    id: student.id,
  }

  return next();
}

export default ensureValidStudent
