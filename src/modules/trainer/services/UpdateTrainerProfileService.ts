import { inject, injectable } from 'tsyringe';

import Trainer from '../infra/typeorm/entities/Trainer';

import ITrainerRepository from '../repositories/ITrainerRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	trainerId: string
	name: string,
	username: string,
  email: string,
	oldPassword?: string,
	password?: string,
}

@injectable()
class UpdateTrainerProfileService{
	constructor(
		@inject('TrainerRepository')
		private trainerRepository: ITrainerRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){}

	public async execute({trainerId, name, username, email, oldPassword, password}: IRequest): Promise<Trainer> {
		const trainer = await this.trainerRepository.findById(trainerId);

		if(!trainer){
			throw new AppError('Treinador(a) não existe.');
		}

		const trainerWithUpdatedUsername = await this.trainerRepository.findByUsername(username);

		if(trainerWithUpdatedUsername && trainerWithUpdatedUsername.id !== trainerId){
			throw new AppError('Esse nome de usuário já esta em uso', 400);
		}

    const trainerWithUpdatedEmail = await this.trainerRepository.findByEmail(email);

		if(trainerWithUpdatedEmail && trainerWithUpdatedEmail.id !== trainerId){
			throw new AppError('Esse nome de usuário já esta em uso', 400);
		}

		trainer.name = name;
		trainer.username = username;
    trainer.email = email;

		if(password && !oldPassword){
			throw new AppError('Você precisa informar a senha antiga para definir uma nova senha.');
		}

		if(password && oldPassword){
			const checkOldPassword = await this.hashProvider.compareHash(oldPassword, trainer.password);

			if(!checkOldPassword){
				throw new AppError('Senha antiga não confere.');
			}

			trainer.password = await this.hashProvider.generateHash(password);
		}

		return await this.trainerRepository.save(trainer);
	}
}

export default UpdateTrainerProfileService;
