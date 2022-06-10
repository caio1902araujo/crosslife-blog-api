import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';
import IFindAllPhysicalEvaluationDTO from '../dtos/IFindAllPhysicalEvaluationDTO';

interface IPhysicalEvaluationRepository {
  findAllPhysicalEvaluations(
    data: IFindAllPhysicalEvaluationDTO,
  ): Promise<PhysicalEvaluation[]>;
  findPhysicalEvaluationFromStudent(
    studentId: string,
  ): Promise<PhysicalEvaluation | undefined>;
  findById(id: string): Promise<PhysicalEvaluation | undefined>;
  save(physicalEvaluation: PhysicalEvaluation): Promise<PhysicalEvaluation>;
}

export default IPhysicalEvaluationRepository;
