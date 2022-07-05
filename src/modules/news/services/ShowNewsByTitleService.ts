import { container, inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';
import UpdateNewsMostAccessedService from './UpdateNewsMostAccessedService';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowNewsByTitleService {
  private updateNewsMostAccessedService;

  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {
    this.updateNewsMostAccessedService = container.resolve(
      UpdateNewsMostAccessedService,
    );
  }

  public async execute(title: string): Promise<News> {
    const news = await this.newsRepository.findByTitle(title);

    if (!news) {
      throw new AppError('Notícia não encontrada.', 404);
    }

    this.updateNewsMostAccessedService.execute(news.id);

    return news;
  }
}

export default ShowNewsByTitleService;
