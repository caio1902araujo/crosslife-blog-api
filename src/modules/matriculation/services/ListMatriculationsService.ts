import { inject, injectable } from 'tsyringe';

import Matriculation from '../infra/typeorm/entities/Matriculation';

import IMatriculationRepository from '../repositories/IMatriculationRepository';
import IFindAllMatriculationsDTO from '../dtos/IFindAllMatriculationsDTO';

@injectable()
class ListMatriculationsService {
  constructor(
    @inject('MatriculationRepository')
    private matriculationRepository: IMatriculationRepository,
  ) {}

  public async execute({
    active,
    type,
    orderCreatedAt,
    username,
    offset,
    limit,
  }: IFindAllMatriculationsDTO): Promise<[Matriculation[], number]> {
    const matriculations =
      await this.matriculationRepository.findAllMatriculations({
        active,
        type,
        orderCreatedAt,
        username,
        offset,
        limit,
      });

    return matriculations;
  }
}

export default ListMatriculationsService;
