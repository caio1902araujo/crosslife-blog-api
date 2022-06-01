import { inject, injectable } from 'tsyringe';

import Matriculation from '../infra/typeorm/entities/Matriculation';

import IMatriculationRepository from '../repositories/IMatriculationRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowMatriculationService{
	constructor(
		@inject('MatriculationRepository')
		private matriculationRepository: IMatriculationRepository,
	){}

	public async execute(id: string): Promise<Matriculation> {
    const matriculation = await this.matriculationRepository.findById(id);

    if(!matriculation){
      throw new AppError('Não encontramos nenhuma matrícula', 404);
    }

		return matriculation;
	}
}

export default ShowMatriculationService;
