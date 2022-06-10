import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IAuthorRepository from '../repositories/IAuthorRepository';

@injectable()
class DeleteAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new AppError('Esse Autor(a) não existe', 404);
    }

    await this.authorRepository.delete(id);
  }
}

export default DeleteAuthorService;
