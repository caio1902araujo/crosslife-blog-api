import { inject, injectable } from 'tsyringe';

import ITrainerRepository from '../repositories/ITrainerRepository';

import Trainer from '../infra/typeorm/entities/Trainer';
import IFindAllTrainerDTO from '../dtos/IFindAllTrainerDTO';

@injectable()
class ListTrainersService{
	constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,
	){}

	public async execute({ name, username, limit, offset }: IFindAllTrainerDTO): Promise<Trainer[]> {
		const trainers = await this.trainerRepository.findAllTrainers({ name, username, limit, offset });

		return trainers;
	}
}

export default ListTrainersService;
