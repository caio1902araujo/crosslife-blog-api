import AccessCounter from '../infra/typeorm/entities/AccessCounter';
import ICreateAccessCounterDTO from '../dtos/ICreateAccessCounterDTO';

interface IAccessCounterRepository {
  findAllMostAccessedNews(): Promise<AccessCounter[]>;
  findByIdNews(newsId: string): Promise<AccessCounter | undefined>;
  create(data: ICreateAccessCounterDTO): Promise<AccessCounter>;
  save(accessCounter: AccessCounter): Promise<AccessCounter>;
}

export default IAccessCounterRepository;
