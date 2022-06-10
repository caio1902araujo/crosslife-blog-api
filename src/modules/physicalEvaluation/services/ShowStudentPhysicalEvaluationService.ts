import { inject, injectable } from 'tsyringe';

import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '../repositories/IPhysicalEvaluationRepository';
import IStudentRepository from '@modules/student/repositories/IStudentRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowStudentPhysicalEvaluationService {
  constructor(
    @inject('PhysicalEvaluationRepository')
    private physicalEvaluationRepository: IPhysicalEvaluationRepository,
  ) {}

  public async execute(studentId: string): Promise<PhysicalEvaluation> {
    const physicalEvaluation =
      await this.physicalEvaluationRepository.findPhysicalEvaluationFromStudent(
        studentId,
      );

    if (!physicalEvaluation) {
      throw new AppError(
        'Não encontramos nenhuma avaliação fisica para esse(a) aluno(a)',
        404,
      );
    }

    return physicalEvaluation;
  }
}

export default ShowStudentPhysicalEvaluationService;
