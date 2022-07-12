import { getRepository, Repository, ILike } from 'typeorm';

import Author from '../entities/Author';

import IAuthorRepository from '@modules/author/repositories/IAuthorRepository';
import ICreateAuthorDTO from '@modules/author/dtos/ICreateAuthorDTO';
import IFindAllAuthorDTO from '@modules/author/dtos/IFindAllAuthorDTO';

class AuthorRepository implements IAuthorRepository {
  private ormRepository: Repository<Author>;

  constructor() {
    this.ormRepository = getRepository(Author);
  }

  public async delete(id: string) {
    await this.ormRepository.delete(id);
  }

  public async findAllAuthors({
    name,
    username,
    offset,
    limit,
  }: IFindAllAuthorDTO): Promise<[Author[], number]> {
    const authors = await this.ormRepository.findAndCount({
      where: {
        name: ILike('%' + name + '%'),
        username: ILike('%' + username + '%'),
      },
      take: limit,
      skip: offset,
    });

    return authors;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const findAuthor = await this.ormRepository.findOne({
      where: { id },
    });

    return findAuthor;
  }

  public async findByUsername(username: string): Promise<Author | undefined> {
    const findAuthor = await this.ormRepository.findOne({
      where: { username },
    });

    return findAuthor;
  }

  public async create(authorData: ICreateAuthorDTO): Promise<Author> {
    const author = this.ormRepository.create(authorData);

    await this.ormRepository.save(author);

    return author;
  }

  public async save(author: Author): Promise<Author> {
    return await this.ormRepository.save(author);
  }
}

export default AuthorRepository;
