import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

interface IRequest {
  fatMass: number;
  leanMass: number;
  muscleMass: number;
  boneDensity: number;
  visceralFat: number;
  basalMetabolism: number;
  hydration: number;
}

class CreatePhysicalEvaluationService {
  public async execute({
    fatMass,
    leanMass,
    muscleMass,
    boneDensity,
    visceralFat,
    basalMetabolism,
    hydration,
  }: IRequest): Promise<PhysicalEvaluation> {
    const physicalEvaluation = new PhysicalEvaluation();
    Object.assign(physicalEvaluation, {
      fatMass,
      leanMass,
      muscleMass,
      boneDensity,
      visceralFat,
      basalMetabolism,
      hydration,
    });

    return physicalEvaluation;
  }
}

export default CreatePhysicalEvaluationService;
