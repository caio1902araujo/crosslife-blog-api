import { inject, injectable } from 'tsyringe';

import IAuthorRepository from '../repositories/IAuthorRepository';

import Author from '../infra/typeorm/entities/Author';

interface IRequest {
  name: string,
	username: string,
  limit: number,
  offset: number,
  order: 'DESC' | 'ASC'
}

@injectable()
class ListAuthorsService{
	constructor(
		@inject('AuthorRepository')
		private authorRepository: IAuthorRepository,
	){}

	public async execute({name, username, limit, offset, order}: IRequest): Promise<Author[]> {
		const authors = await this.authorRepository.findAllAuthors({name, username, limit, offset, order});

		return authors;
	}
}

export default ListAuthorsService;
