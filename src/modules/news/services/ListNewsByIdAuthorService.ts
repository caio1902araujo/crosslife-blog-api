import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';
import IFindAllNewsByIdAuhorDTO from '../dtos/IFindAllNewsByIdAuhorDTO';

@injectable()
class ListNewsByIdAuthorService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    authorId,
    title,
    offset,
    limit,
  }: IFindAllNewsByIdAuhorDTO): Promise<[News[], number]> {
    const news = await this.newsRepository.findAllNewsByIdAuthor({
      authorId,
      title,
      offset,
      limit,
    });

    return news;
  }
}

export default ListNewsByIdAuthorService;
