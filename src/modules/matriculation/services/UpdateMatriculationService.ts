import { inject, injectable } from 'tsyringe';

import Matriculation from '../infra/typeorm/entities/Matriculation';

import IMatriculationRepository from '../repositories/IMatriculationRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  matriculationId: string,
  active: boolean,
  type: string,
  finished_at: Date
}

@injectable()
class UpdateMatriculationService{
	constructor(
		@inject('MatriculationRepository')
		private matriculationRepository: IMatriculationRepository,
	){}

	public async execute({ matriculationId, active, type, finished_at }: IRequest): Promise<Matriculation> {
		const matriculation = await this.matriculationRepository.findById(matriculationId);

		if(!matriculation){
			throw new AppError('Essa matrícula não existe.', 404);
		}

		matriculation.active = active;
		matriculation.type = type;
		matriculation.finished_at = finished_at;

		return await this.matriculationRepository.save(matriculation);
	}
}

export default UpdateMatriculationService;
