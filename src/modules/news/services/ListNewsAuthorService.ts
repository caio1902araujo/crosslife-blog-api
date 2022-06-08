import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';
import IFindAllNewsByAuhorDTO from '../dtos/IFindAllNewsByAuhorDTO';

@injectable()
class ListNewsAuthorService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    username,
    title,
    offset,
    limit,
  }: IFindAllNewsByAuhorDTO): Promise<News[]> {
    const news = await this.newsRepository.findAllNewsByAuhor({
      username,
      title,
      offset,
      limit,
    });

    return news;
  }
}

export default ListNewsAuthorService;
