import { injectable, inject } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  newsId: string;
  categoryImage: string;
  coverFilename: string;
  authorId: string;
}

@injectable()
class UpdateCoverNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    newsId,
    categoryImage,
    coverFilename,
    authorId,
  }: IRequest): Promise<News> {
    const news = await this.newsRepository.findById(newsId);

    if (!news) {
      throw new AppError('Essa notícia não existe', 404);
    }

    if (news.author_id !== authorId) {
      throw new AppError(
        'Esse usuário não tem permissão para fazer alterações nessa notícia',
        403,
      );
    }

    if (news.cover) {
      this.storageProvider.deleteFile({ categoryImage, file: news.cover });
    }

    const fileName = await this.storageProvider.saveFile({
      categoryImage,
      file: coverFilename,
    });

    news.cover = fileName;
    this.newsRepository.save(news);

    return news;
  }
}

export default UpdateCoverNewsService;
