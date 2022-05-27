import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';

@injectable()
class DeletePhysicalEvaluationService {
  constructor(
		@inject('PhysicalEvaluationRepository')
		private physicalEvaluationRepository: IPhysicalEvaluationRepository,
	){}

  public async execute(id:string): Promise<void> {
    const physicalEvaluation = await this.physicalEvaluationRepository.findById(id);

    if(!physicalEvaluation){
      throw new AppError('Essa avaliação física não existe', 404);
    }

    await this.physicalEvaluationRepository.delete(id);
  }
}

export default DeletePhysicalEvaluationService;
