import { inject, injectable } from 'tsyringe';

import News from '../infra/typeorm/entities/News';
import INewsRepository from '../repositories/INewsRepository';
import IFindAllNewsByUsernameAuhorDTO from '../dtos/IFindAllNewsByUsernameAuhorDTO';

@injectable()
class ListNewsAuthorService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) {}

  public async execute({
    username,
    offset,
    limit,
  }: IFindAllNewsByUsernameAuhorDTO): Promise<[News[], number]> {
    const news = await this.newsRepository.findAllNewsByUsernameAuthor({
      username,
      offset,
      limit,
    });

    return news;
  }
}

export default ListNewsAuthorService;
