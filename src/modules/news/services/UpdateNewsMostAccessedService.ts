import { injectable, inject } from 'tsyringe';

import IAccessCounterRepository from '../repositories/IAccessCounterRepository';
import INewsRepository from '../repositories/INewsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class UpdateNewsMostAccessedService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('AccessCounterRepository')
    private accessCounterRepository: IAccessCounterRepository,
  ) {}

  public async execute(title: string): Promise<void> {
    const news = await this.newsRepository.findByTitle(title);

    if (!news) {
      throw new AppError('Essa notícia não existe', 404);
    }

    const accessCounter = await this.accessCounterRepository.findByIdNews(
      news.id,
    );

    if (accessCounter) {
      accessCounter.count += 1;
      this.accessCounterRepository.save(accessCounter);
    } else {
      this.accessCounterRepository.create({ newsId: news.id, count: 1 });
    }
  }
}

export default UpdateNewsMostAccessedService;
