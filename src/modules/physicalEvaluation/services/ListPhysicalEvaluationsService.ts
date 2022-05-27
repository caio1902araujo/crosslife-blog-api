import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';

interface IRequest {
  name: string,
  username: string,
  limit: number,
  offset: number,
}


@injectable()
class ListPhysicalEvaluationsService{
	constructor(
		@inject('PhysicalEvaluationRepository')
		private physicalEvaluationRepository: IPhysicalEvaluationRepository,
	){}

	public async execute({name, username, limit, offset}: IRequest): Promise<PhysicalEvaluation[]> {
    const physicalEvaluation = await this.physicalEvaluationRepository.findAllPhysicalEvaluations({name, username, limit, offset});

		return physicalEvaluation;
	}
}

export default ListPhysicalEvaluationsService;
