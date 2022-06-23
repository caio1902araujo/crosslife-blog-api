import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import INewsRepository from '../repositories/INewsRepository';

@injectable()
class DeleteNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute(id: string, authorId: string): Promise<void> {
    const news = await this.newsRepository.findById(id);

    if (!news) {
      throw new AppError('Notícia não encontrada', 404);
    }

    if (news.authorId !== authorId) {
      throw new AppError(
        'Você não tem autorização para editar essa notícia',
        403,
      );
    }

    await this.newsRepository.delete(id);
  }
}

export default DeleteNewsService;
