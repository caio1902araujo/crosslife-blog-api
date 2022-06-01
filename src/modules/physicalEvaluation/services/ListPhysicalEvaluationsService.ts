import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';
import IFindAllPhysicalEvaluationDTO from '../dtos/IFindAllPhysicalEvaluationDTO'


@injectable()
class ListPhysicalEvaluationsService{
	constructor(
		@inject('PhysicalEvaluationRepository')
		private physicalEvaluationRepository: IPhysicalEvaluationRepository,
	){}

	public async execute({name, username, limit, offset}: IFindAllPhysicalEvaluationDTO): Promise<PhysicalEvaluation[]> {
    const physicalEvaluation = await this.physicalEvaluationRepository.findAllPhysicalEvaluations({name, username, limit, offset});

		return physicalEvaluation;
	}
}

export default ListPhysicalEvaluationsService;
