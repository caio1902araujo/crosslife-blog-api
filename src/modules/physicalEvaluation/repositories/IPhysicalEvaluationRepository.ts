import PhysicalEvaluation from '../infra/typeorm/entities/PhysicalEvaluation';
import ICreatePhysicalEvaluationDTO from '../dtos/ICreatePhysicalEvaluationDTO';
import IFindAllPhysicalEvaluationDTO from '../dtos/IFindAllPhysicalEvaluationDTO';

interface IPhysicalEvaluationRepository{
  findAllPhysicalEvaluations(data: IFindAllPhysicalEvaluationDTO): Promise<PhysicalEvaluation[]>;
	findPhysicalEvaluationFromStudent(student_id: string): Promise<PhysicalEvaluation | undefined>;
	findById(id: string): Promise<PhysicalEvaluation | undefined>;
  delete(id: string): Promise<void>;
	create(data: ICreatePhysicalEvaluationDTO): Promise<PhysicalEvaluation>;
	save(physicalEvaluation: PhysicalEvaluation): Promise<PhysicalEvaluation>;
}

export default IPhysicalEvaluationRepository;
