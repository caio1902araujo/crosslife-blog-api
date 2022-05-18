import { Request, Response, NextFunction } from 'express';
import TrainerRepository from '../../typeorm/repositories/TrainerRepository';

import AppError from '@shared/errors/AppError';

async function ensureValidTrainer(request: Request, response: Response, next: NextFunction): Promise<void>{
	const idSub = request.tokenSub.id;
  const trainerRepository = new TrainerRepository();

	request.tokenSub = {
    id: ''
  };

  const trainer = await trainerRepository.findById(idSub);

  if(!trainer){
    throw new AppError('Esse usuário não tem permissão para acessar esse recurso.', 401);
  }

  request.trainer = {
    id: trainer.id,
  }

  return next();
}

export default ensureValidTrainer
