import { injectable, inject } from 'tsyringe';

import Trainer from '../infra/typeorm/entities/Trainer';

import ITrainerRepository from '../repositories/ITrainerRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import ICreateTrainerDTO from '../dtos/ICreateTrainerDTO';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateTrainerService {
	constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){}

	public async execute({name, username, password, email}: ICreateTrainerDTO): Promise<Trainer>{
		const checkUsernameExist = await this.trainerRepository.findByUsername(username);

		if(checkUsernameExist){
			throw new AppError('O nome de usuário ja esta em uso.', 400);
		}

    const checkEmailExist = await this.trainerRepository.findByEmail(email);

		if(checkEmailExist){
			throw new AppError('O email ja esta em uso.', 400);
		}

		const passwordHashed = await this.hashProvider.generateHash(password);

		const trainer = this.trainerRepository.create({
			name,
      email,
			username,
			password: passwordHashed,
		});

		return trainer;
	}
}

export default CreateTrainerService;
