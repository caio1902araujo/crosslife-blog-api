import { inject, injectable } from 'tsyringe';

import Author from '../infra/typeorm/entities/Author';

import IAuthorRepository from '../repositories/IAuthorRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  authorId: string;
  name: string;
  username: string;
  description: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateAuthorProfileService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    authorId,
    name,
    username,
    description,
    oldPassword,
    password,
  }: IRequest): Promise<Author> {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new AppError('Autor(a) não existe.', 404);
    }

    const authorWithUpdatedUsername =
      await this.authorRepository.findByUsername(username);

    if (
      authorWithUpdatedUsername &&
      authorWithUpdatedUsername.id !== authorId
    ) {
      throw new AppError('Esse nome de usuário já esta em uso');
    }

    author.name = name;
    author.username = username;
    author.description = description;

    if (password && !oldPassword) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir uma nova senha.',
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        author.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha antiga não confere.');
      }

      author.password = await this.hashProvider.generateHash(password);
    }

    return await this.authorRepository.save(author);
  }
}

export default UpdateAuthorProfileService;
