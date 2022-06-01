import { inject, injectable } from 'tsyringe';

import IAuthorRepository from '../repositories/IAuthorRepository';

import Author from '../infra/typeorm/entities/Author';
import IFindAllAuthorDTO from '../dtos/IFindAllAuthorDTO';

@injectable()
class ListAuthorsService{
	constructor(
		@inject('AuthorRepository')
		private authorRepository: IAuthorRepository,
	){}

	public async execute({ name, username, limit, offset }: IFindAllAuthorDTO): Promise<Author[]> {
		const authors = await this.authorRepository.findAllAuthors({ name, username, limit, offset });

		return authors;
	}
}

export default ListAuthorsService;
