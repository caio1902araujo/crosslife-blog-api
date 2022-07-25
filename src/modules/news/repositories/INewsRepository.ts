import News from '../infra/typeorm/entities/News';
import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import IFindAllNewsDTO from '../dtos/IFindAllNewsDTO';
import IFindAllNewsByIdAuhorDTO from '../dtos/IFindAllNewsByIdAuhorDTO';

interface INewsRepository {
  findAllNews(data: IFindAllNewsDTO): Promise<[News[], number]>;
  findAllNewsByIdAuthor(
    data: IFindAllNewsByIdAuhorDTO,
  ): Promise<[News[], number]>;
  findById(id: string): Promise<News | undefined>;
  findByTitle(id: string): Promise<News | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateNewsDTO): Promise<News>;
  save(news: News): Promise<News>;
}

export default INewsRepository;
