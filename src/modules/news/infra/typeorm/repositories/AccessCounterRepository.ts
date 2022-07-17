import { getRepository, Repository } from 'typeorm';

import AccessCounter from '../entities/AccessCounter';

import IAccessCounterRepository from '@modules/news/repositories/IAccessCounterRepository';
import ICreateAccessCounterDTO from '@modules/news/dtos/ICreateAccessCounterDTO';

class AccessCounterRepository implements IAccessCounterRepository {
  private ormRepository: Repository<AccessCounter>;

  constructor() {
    this.ormRepository = getRepository(AccessCounter);
  }

  public async findAllMostAccessedNews() {
    const accessCounter = await this.ormRepository
      .createQueryBuilder('accessCounter')
      .leftJoinAndSelect('accessCounter.news', 'news')
      .leftJoinAndSelect('news.author', 'author')
      .select([
        'accessCounter.count',
        'news.title',
        'news.createdAt',
        'author.name',
      ])
      .orderBy('accessCounter.count', 'DESC')
      .limit(6)
      .getMany();

    return accessCounter;
  }

  public async findByIdNews(
    newsId: string,
  ): Promise<AccessCounter | undefined> {
    const accessCounter = await this.ormRepository.findOne({
      where: { newsId },
    });

    return accessCounter;
  }

  public async create(
    accessCounterData: ICreateAccessCounterDTO,
  ): Promise<AccessCounter> {
    const accessCounter = this.ormRepository.create(accessCounterData);

    await this.ormRepository.save(accessCounter);

    return accessCounter;
  }

  public async save(accessCounter: AccessCounter): Promise<AccessCounter> {
    return await this.ormRepository.save(accessCounter);
  }
}

export default AccessCounterRepository;
