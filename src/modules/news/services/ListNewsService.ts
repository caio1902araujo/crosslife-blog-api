import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';
import IFindAllNewsDTO from '../dtos/IFindAllNewsDTO';

@injectable()
class ListNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    title,
    limit,
    offset,
  }: IFindAllNewsDTO): Promise<News[]> {
    const news = await this.newsRepository.findAllNews({
      title,
      limit,
      offset,
    });

    return news;
  }
}

export default ListNewsService;
