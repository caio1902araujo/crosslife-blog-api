import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ITrainerRepository from '../repositories/ITrainerRepository';

@injectable()
class DeleteTrainerService {
  constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,
	){}

  public async execute(id:string): Promise<void> {
    const trainer = await this.trainerRepository.findById(id);

    if(!trainer){
      throw new AppError('Esse treinador não existe', 404);
    }

    await this.trainerRepository.delete(id);
  }
}

export default DeleteTrainerService;
