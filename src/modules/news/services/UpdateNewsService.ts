import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  newsId: string;
  title: string;
  subtitle: string;
  body: string;
  category: string;
  author_id: string;
}

@injectable()
class UpdateNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    newsId,
    title,
    subtitle,
    body,
    category,
    author_id,
  }: IRequest): Promise<News> {
    const news = await this.newsRepository.findById(newsId);

    if (!news) {
      throw new AppError('Notícia não foi encontrada.', 404);
    }

    if (news.author_id !== author_id) {
      throw new AppError(
        'Você não tem autorização para editar essa notícia',
        403,
      );
    }

    news.title = title;
    news.subtitle = subtitle;
    news.body = body;
    news.category = category;

    return await this.newsRepository.save(news);
  }
}

export default UpdateNewsService;
