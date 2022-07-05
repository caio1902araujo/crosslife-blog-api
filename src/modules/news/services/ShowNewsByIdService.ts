import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  newsId: string;
  authorId: string;
}

@injectable()
class ShowNewsByIdService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    newsId,
    authorId,
  }: IRequest): Promise<News | undefined> {
    const news = await this.newsRepository.findById(newsId);

    if (!news) {
      throw new AppError('Notícia não encontrada.', 404);
    }

    if (news.authorId !== authorId) {
      throw new AppError(
        'Você não tem permissão para fazer ações nessa notícia',
        403,
      );
    }

    return news;
  }
}

export default ShowNewsByIdService;
