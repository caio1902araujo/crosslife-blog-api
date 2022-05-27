import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowPhysicalEvaluationService{
	constructor(
		@inject('PhysicalEvaluationRepository')
		private physicalEvaluationRepository: IPhysicalEvaluationRepository,
	){}

	public async execute(id: string): Promise<PhysicalEvaluation> {
    const physicalEvaluation = await this.physicalEvaluationRepository.findById(id);

    if(!physicalEvaluation){
      throw new AppError('Não encontramos nenhuma avaliação física', 404);
    }

		return physicalEvaluation;
	}
}

export default ShowPhysicalEvaluationService;
