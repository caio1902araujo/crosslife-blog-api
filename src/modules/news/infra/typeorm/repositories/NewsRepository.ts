import { getRepository, Repository, ILike } from 'typeorm';

import News from '../entities/News';

import INewsRepository from '@modules/news/repositories/INewsRepository';
import ICreateNewsDTO from '@modules/news/dtos/ICreateNewsDTO';
import IFindAllNewsDTO from '@modules/news/dtos/IFindAllNewsDTO';
import IFindAllNewsByUsernameAuhorDTO from '@modules/news/dtos/IFindAllNewsByUsernameAuhorDTO';
import IFindAllNewsByIdAuhorDTO from '@modules/news/dtos/IFindAllNewsByIdAuhorDTO';

class NewsRepository implements INewsRepository {
  private ormRepository: Repository<News>;

  constructor() {
    this.ormRepository = getRepository(News);
  }

  public async delete(id: string) {
    await this.ormRepository.delete(id);
  }

  public async findAllNewsByUsernameAuthor({
    username,
    offset,
    limit,
  }: IFindAllNewsByUsernameAuhorDTO): Promise<[News[], number]> {
    const news = await this.ormRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.author', 'author')
      .where('author.username = :username', { username })
      .select(['news.title', 'news.category', 'author.name'])
      .orderBy('news.createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();

    return news;
  }

  public async findAllNews({
    title,
    category,
    offset,
    limit,
  }: IFindAllNewsDTO): Promise<[News[], number]> {
    let queryNews = this.ormRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.author', 'author')
      .select(['news.title', 'news.category', 'news.createdAt', 'author.name'])
      .where('title ILIKE :title', { title: `%${title}%` })
      .orderBy('news.createdAt', 'DESC')
      .offset(offset)
      .limit(limit);

    if (category !== undefined) {
      queryNews = queryNews.andWhere('category = :category', {
        category: `${category}`,
      });
    }

    const news = queryNews.getManyAndCount();

    return news;
  }

  public async findById(id: string): Promise<News | undefined> {
    const findNews = await this.ormRepository.findOne({
      where: { id },
    });

    return findNews;
  }

  public async findAllNewsByIdAuthor({
    authorId,
    title,
    offset,
    limit,
  }: IFindAllNewsByIdAuhorDTO): Promise<[News[], number]> {
    const findNews = await this.ormRepository.findAndCount({
      where: { authorId, title: ILike(`%${title}%`) },
      skip: offset,
      take: limit,
    });

    return findNews;
  }

  public async findByTitle(title: string): Promise<News | undefined> {
    const findNews = await this.ormRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.author', 'author')
      .select([
        'news.id',
        'news.title',
        'news.subtitle',
        'news.body',
        'news.category',
        'news.cover',
        'news.createdAt',
        'news.updatedAt',
        'author.name',
        'author.avatar',
        'author.username',
        'author.description',
      ])
      .where('news.title = :title', { title })
      .getOne();

    return findNews;
  }

  public async create(newsData: ICreateNewsDTO): Promise<News> {
    const news = this.ormRepository.create(newsData);

    await this.ormRepository.save(news);

    return news;
  }

  public async save(news: News): Promise<News> {
    return await this.ormRepository.save(news);
  }
}

export default NewsRepository;
