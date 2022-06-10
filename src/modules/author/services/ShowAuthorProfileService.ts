import { inject, injectable } from 'tsyringe';

import Author from '../infra/typeorm/entities/Author';

import IAuthorRepository from '../repositories/IAuthorRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowAuthorProfileService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,
  ) {}

  public async execute(authorId: string): Promise<Author> {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new AppError('Autor(a) não encontrado(a).', 404);
    }

    return author;
  }
}

export default ShowAuthorProfileService;
