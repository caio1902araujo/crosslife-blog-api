import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  physicalEvaluationId: string,
  fat_mass: number,
  lean_mass: number,
  muscle_mass: number,
  bone_density: number,
  visceral_fat: number,
  basal_metabolism: number,
  hydration: number,
}

@injectable()
class UpdatePhysicalEvaluationService{
	constructor(
		@inject('PhysicalEvaluationRepository')
		private physicalEvaluationRepository: IPhysicalEvaluationRepository,
	){}

	public async execute({physicalEvaluationId, fat_mass, lean_mass, muscle_mass, bone_density, visceral_fat, basal_metabolism, hydration}: IRequest): Promise<PhysicalEvaluation> {
		const physicalEvaluation = await this.physicalEvaluationRepository.findById(physicalEvaluationId);

		if(!physicalEvaluation){
			throw new AppError('Avaliação física não existe.', 404);
		}

		physicalEvaluation.fat_mass = fat_mass;
		physicalEvaluation.lean_mass = lean_mass;
    physicalEvaluation.muscle_mass = muscle_mass;
    physicalEvaluation.bone_density = bone_density;
    physicalEvaluation.visceral_fat = visceral_fat;
    physicalEvaluation.basal_metabolism = basal_metabolism;
    physicalEvaluation.hydration = hydration;

		return await this.physicalEvaluationRepository.save(physicalEvaluation);
	}
}

export default UpdatePhysicalEvaluationService;
