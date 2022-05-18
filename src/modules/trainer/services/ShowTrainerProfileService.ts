import { inject, injectable } from 'tsyringe';

import Trainer from '../infra/typeorm/entities/Trainer';

import ITrainerRepository from '../repositories/ITrainerRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowTrainerProfileService{
	constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,
	){}

	public async execute(trainerId: string): Promise<Trainer> {
		const trainer = await this.trainerRepository.findById(trainerId);

		if(!trainer){
			throw new AppError('Treinador(a) não encontrado(a).', 404);
		}

		return trainer;
	}
}

export default ShowTrainerProfileService;
