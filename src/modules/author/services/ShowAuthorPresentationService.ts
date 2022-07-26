import { inject, injectable } from 'tsyringe';

import Author from '../infra/typeorm/entities/Author';

import IAuthorRepository from '../repositories/IAuthorRepository';

import AppError from '@shared/errors/AppError';

interface IResponse {
  name: string;
  description: string;
  avatar?: string;
  avatarUrl: string | null;
}

@injectable()
class ShowAuthorPresentationService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,
  ) {}

  public async execute(username: string): Promise<IResponse> {
    const author = await this.authorRepository.findByUsername(username);

    if (!author) {
      throw new AppError('Autor(a) não encontrado(a).', 404);
    }

    const { name, description, avatar } = author;

    return {
      name,
      description,
      avatar,
      avatarUrl: author.getAvatarUrl(),
    };
  }
}

export default ShowAuthorPresentationService;
