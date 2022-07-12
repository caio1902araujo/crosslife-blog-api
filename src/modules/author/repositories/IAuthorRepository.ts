import Author from '../infra/typeorm/entities/Author';
import ICreateAuthorDTO from '../dtos/ICreateAuthorDTO';
import IFindAllAuthorDTO from '../dtos/IFindAllAuthorDTO';

interface IAuthorRepository {
  findAllAuthors(data: IFindAllAuthorDTO): Promise<[Author[], number]>;
  findById(id: string): Promise<Author | undefined>;
  findByUsername(username: string): Promise<Author | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateAuthorDTO): Promise<Author>;
  save(author: Author): Promise<Author>;
}

export default IAuthorRepository;
