import { inject, injectable } from 'tsyringe';

import Matriculation from '../infra/typeorm/entities/Matriculation';

import IMatriculationRepository from '../repositories/IMatriculationRepository';

import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';

interface IRequest {
  id: string;
  active: boolean;
  type: string;
  finishedAt: Date;
}

@injectable()
class UpdateMatriculationService {
  constructor(
    @inject('MatriculationRepository')
    private matriculationRepository: IMatriculationRepository,
  ) {}

  public async execute({
    id,
    active,
    type,
    finishedAt,
  }: IRequest): Promise<Matriculation> {
    const matriculation = await this.matriculationRepository.findById(id);

    if (!matriculation) {
      throw new AppError('Essa matrícula não existe.', 404);
    }

    if (
      matriculation.finishedAt !== finishedAt &&
      isBefore(finishedAt, Date.now())
    ) {
      throw new AppError(
        'Você não pode escolher uma data que ja passou para finalização de matrícula .',
        400,
      );
    }

    matriculation.active = active;
    matriculation.type = type;
    matriculation.finishedAt = finishedAt;

    return await this.matriculationRepository.save(matriculation);
  }
}

export default UpdateMatriculationService;
