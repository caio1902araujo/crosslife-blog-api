import { inject, injectable } from 'tsyringe';

import ITrainerRepository from '../repositories/ITrainerRepository';

import Trainer from '../infra/typeorm/entities/Trainer';

interface IRequest {
  name: string,
	username: string,
  limit: number,
  offset: number,
  order: 'DESC' | 'ASC'
}

@injectable()
class ListTrainersService{
	constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,
	){}

	public async execute({name, username, limit, offset, order}: IRequest): Promise<Trainer[]> {
		const trainers = await this.trainerRepository.findAllTrainers({name, username, limit, offset, order});

		return trainers;
	}
}

export default ListTrainersService;
