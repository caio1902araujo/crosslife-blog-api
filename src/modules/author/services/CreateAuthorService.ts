import { injectable, inject } from 'tsyringe';

import Author from '../infra/typeorm/entities/Author';

import IAuthorRepository from '../repositories/IAuthorRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string,
	username: string,
	password: string,
  description: string,
}

@injectable()
class CreateAuthorService {
	constructor(
		@inject('AuthorRepository')
		private authorRepository: IAuthorRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){}

	public async execute({name, username, password, description}: IRequest): Promise<Author>{
		const checkUserExist = await this.authorRepository.findByUsername(username);

		if(checkUserExist){
			throw new AppError('O nome de usuário ja esta em uso.');
		}

		const passwordHashed = await this.hashProvider.generateHash(password);

		const author = this.authorRepository.create({
			name,
			username,
			password: passwordHashed,
      description,
		})

		return author;
	}
}

export default CreateAuthorService;
