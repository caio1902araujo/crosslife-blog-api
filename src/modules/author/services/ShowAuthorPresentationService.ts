import { inject, injectable } from 'tsyringe';

import IAuthorRepository from '../repositories/IAuthorRepository';

import AppError from '@shared/errors/AppError';

interface IResponse {
  avatar: string,
  name: string,
  description: string,
}

@injectable()
class ShowAuthorPresentationService{
	constructor(
		@inject('AuthorRepository')
		private authorRepository: IAuthorRepository,
	){}

	public async execute(username: string): Promise<IResponse> {
		const author = await this.authorRepository.findByUsername(username);

		if(!author){
			throw new AppError('Autor(a) não encontrado(a).');
		}

		return author;
	}
}

export default ShowAuthorPresentationService;
