import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

interface IRequest {
  fat_mass: number,
  lean_mass: number,
  muscle_mass: number,
  bone_density: number,
  visceral_fat: number,
  basal_metabolism: number,
  hydration: number,
}

class CreatePhysicalEvaluationService {
	public async execute({fat_mass, lean_mass, muscle_mass, bone_density, visceral_fat, basal_metabolism, hydration }: IRequest): Promise<PhysicalEvaluation>{

    const physicalEvaluation = new PhysicalEvaluation ()
    Object.assign(physicalEvaluation, {
      fat_mass,
      lean_mass,
      muscle_mass,
      bone_density,
      visceral_fat,
      basal_metabolism,
      hydration,
    });

		return physicalEvaluation;
	}
}

export default CreatePhysicalEvaluationService;
