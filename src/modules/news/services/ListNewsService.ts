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
    category,
    limit,
    offset,
  }: IFindAllNewsDTO): Promise<[News[], number]> {
    const news = await this.newsRepository.findAllNews({
      title,
      category,
      limit,
      offset,
    });

    return news;
  }
}

export default ListNewsService;
