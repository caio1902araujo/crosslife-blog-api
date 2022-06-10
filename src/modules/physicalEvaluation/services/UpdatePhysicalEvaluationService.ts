import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  fatMass: number;
  leanMass: number;
  muscleMass: number;
  boneDensity: number;
  visceralFat: number;
  basalMetabolism: number;
  hydration: number;
}

@injectable()
class UpdatePhysicalEvaluationService {
  constructor(
    @inject('PhysicalEvaluationRepository')
    private physicalEvaluationRepository: IPhysicalEvaluationRepository,
  ) {}

  public async execute({
    id,
    fatMass,
    leanMass,
    muscleMass,
    boneDensity,
    visceralFat,
    basalMetabolism,
    hydration,
  }: IRequest): Promise<PhysicalEvaluation> {
    const physicalEvaluation = await this.physicalEvaluationRepository.findById(
      id,
    );

    if (!physicalEvaluation) {
      throw new AppError('Avaliação física não encontrada.', 404);
    }

    physicalEvaluation.fatMass = fatMass;
    physicalEvaluation.leanMass = leanMass;
    physicalEvaluation.muscleMass = muscleMass;
    physicalEvaluation.boneDensity = boneDensity;
    physicalEvaluation.visceralFat = visceralFat;
    physicalEvaluation.basalMetabolism = basalMetabolism;
    physicalEvaluation.hydration = hydration;

    return await this.physicalEvaluationRepository.save(physicalEvaluation);
  }
}

export default UpdatePhysicalEvaluationService;
