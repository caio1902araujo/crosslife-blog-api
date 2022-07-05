import { injectable, inject } from 'tsyringe';

import IAccessCounterRepository from '../repositories/IAccessCounterRepository';

@injectable()
class UpdateNewsMostAccessedService {
  constructor(
    @inject('AccessCounterRepository')
    private accessCounterRepository: IAccessCounterRepository,
  ) {}

  public async execute(newsId: string): Promise<void> {
    const accessCounter = await this.accessCounterRepository.findByIdNews(
      newsId,
    );

    if (accessCounter) {
      accessCounter.count += 1;
      this.accessCounterRepository.save(accessCounter);
    } else {
      this.accessCounterRepository.create({ newsId, count: 1 });
    }
  }
}

export default UpdateNewsMostAccessedService;
