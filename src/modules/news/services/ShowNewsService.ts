import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute(title: string): Promise<News> {
    const news = await this.newsRepository.findByTitle(title);

    if (!news) {
      throw new AppError('Notícia não encontrada.', 404);
    }

    return news;
  }
}

export default ShowNewsService;
