import { inject, injectable } from 'tsyringe';

import Matriculation from '../infra/typeorm/entities/Matriculation';

import IMatriculationRepository from '../repositories/IMatriculationRepository';

import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';

interface IRequest {
  matriculationId: string;
  active: boolean;
  type: string;
  finished_at: Date;
}

@injectable()
class UpdateMatriculationService {
  constructor(
    @inject('MatriculationRepository')
    private matriculationRepository: IMatriculationRepository,
  ) {}

  public async execute({
    matriculationId,
    active,
    type,
    finished_at,
  }: IRequest): Promise<Matriculation> {
    const matriculation = await this.matriculationRepository.findById(
      matriculationId,
    );

    if (!matriculation) {
      throw new AppError('Essa matrícula não existe.', 404);
    }

    if (
      matriculation.finished_at !== finished_at &&
      isBefore(finished_at, Date.now())
    ) {
      throw new AppError(
        'Você não pode escolher uma data que ja passou para finalização de matrícula .',
        400,
      );
    }

    matriculation.active = active;
    matriculation.type = type;
    matriculation.finished_at = finished_at;

    return await this.matriculationRepository.save(matriculation);
  }
}

export default UpdateMatriculationService;
