import News from '../infra/typeorm/entities/News';
import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import IFindAllNewsDTO from '../dtos/IFindAllNewsDTO';
import IFindAllNewsByAuhorDTO from '../dtos/IFindAllNewsByAuhorDTO';

interface INewsRepository {
  findAllNews(data: IFindAllNewsDTO): Promise<News[]>;
  findAllNewsByAuhor(data: IFindAllNewsByAuhorDTO): Promise<News[]>;
  findById(id: string): Promise<News | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateNewsDTO): Promise<News>;
  save(budget: News): Promise<News>;
}

export default INewsRepository;
