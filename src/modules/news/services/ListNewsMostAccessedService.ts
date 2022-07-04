import { inject, injectable } from 'tsyringe';

import AccessCounter from '../infra/typeorm/entities/AccessCounter';
import IAccessCounterRepository from '../repositories/IAccessCounterRepository';

@injectable()
class ListNewsMostAccessedService {
  constructor(
    @inject('AccessCounterRepository')
    private accessCounterRepository: IAccessCounterRepository,
  ) {}

  public async execute(): Promise<AccessCounter[]> {
    const news = await this.accessCounterRepository.findAllMostAccessedNews();

    return news;
  }
}

export default ListNewsMostAccessedService;
