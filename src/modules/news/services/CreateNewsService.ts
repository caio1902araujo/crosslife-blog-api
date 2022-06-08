import { injectable, inject } from 'tsyringe';

import News from '../infra/typeorm/entities/News';

import INewsRepository from '../repositories/INewsRepository';
import ICreateNewsDTO from '../dtos/ICreateNewsDTO';

@injectable()
class CreateNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    title,
    subtitle,
    body,
    category,
    author_id,
  }: ICreateNewsDTO): Promise<News> {
    const news = this.newsRepository.create({
      title,
      subtitle,
      body,
      category,
      author_id,
    });

    return news;
  }
}

export default CreateNewsService;
