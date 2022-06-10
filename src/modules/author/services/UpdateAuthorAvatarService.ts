import { injectable, inject } from 'tsyringe';

import Author from '../infra/typeorm/entities/Author';

import IAuthorRepository from '../repositories/IAuthorRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  authorId: string;
  categoryImage: string;
  avatarFilename: string;
}

@injectable()
class UpdateAuthorAvatarService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    authorId,
    categoryImage,
    avatarFilename,
  }: IRequest): Promise<Author> {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new AppError('Autor(a) não encontrado(a)', 404);
    }

    if (author.avatar) {
      this.storageProvider.deleteFile({ categoryImage, file: author.avatar });
    }

    const fileName = await this.storageProvider.saveFile({
      categoryImage,
      file: avatarFilename,
    });

    author.avatar = fileName;
    this.authorRepository.save(author);

    return author;
  }
}

export default UpdateAuthorAvatarService;
