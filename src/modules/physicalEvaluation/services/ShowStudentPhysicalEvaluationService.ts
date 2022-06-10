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

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(student_id: string): Promise<PhysicalEvaluation> {
    const student = await this.studentRepository.findById(student_id);

    if (!student) {
      throw new AppError('Aluno(a) não encontrado(a).', 404);
    }
    const physicalEvaluation =
      await this.physicalEvaluationRepository.findPhysicalEvaluationFromStudent(
        student.id,
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
