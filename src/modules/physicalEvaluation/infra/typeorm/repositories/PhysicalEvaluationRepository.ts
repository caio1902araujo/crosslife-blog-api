import { getRepository, Repository } from 'typeorm';

import PhysicalEvaluation from '../entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '@modules/physicalEvaluation/repositories/IPhysicalEvaluationRepository';
import IFindAllPhysicalEvaluationDTO from '@modules/physicalEvaluation/dtos/IFindAllPhysicalEvaluationDTO';

class PhysicalEvaluationRepository implements IPhysicalEvaluationRepository {
  private ormRepository: Repository<PhysicalEvaluation>;

  constructor() {
    this.ormRepository = getRepository(PhysicalEvaluation);
  }

  public async findAllPhysicalEvaluations({
    name,
    username,
    offset,
    limit,
  }: IFindAllPhysicalEvaluationDTO): Promise<PhysicalEvaluation[]> {
    const physicalEvaluation = await this.ormRepository
      .createQueryBuilder('physical_evaluation')
      .leftJoinAndSelect('physical_evaluation.student', 'student')
      .where('student.name ILIKE :name AND student.username ILIKE :username', {
        name: `%${name}%`,
        username: `%${username}%`,
      })
      .select([
        'physical_evaluation.id',
        'physical_evaluation.fat_mass',
        'physical_evaluation.lean_mass',
        'physical_evaluation.muscle_mass',
        'physical_evaluation.bone_density',
        'physical_evaluation.visceral_fat',
        'physical_evaluation.basal_metabolism',
        'physical_evaluation.hydration',
        'student.name',
        'student.username',
      ])
      .offset(offset)
      .limit(limit)
      .getMany();

    return physicalEvaluation;
  }

  public async findPhysicalEvaluationFromStudent(
    student_id: string,
  ): Promise<PhysicalEvaluation | undefined> {
    const findPhysicalEvaluation = await this.ormRepository.findOne({
      where: { student_id },
    });

    return findPhysicalEvaluation;
  }

  public async findById(id: string): Promise<PhysicalEvaluation | undefined> {
    const findPhysicalEvaluation = await this.ormRepository.findOne({
      where: { id },
    });

    return findPhysicalEvaluation;
  }

  public async save(
    physicalEvaluation: PhysicalEvaluation,
  ): Promise<PhysicalEvaluation> {
    return await this.ormRepository.save(physicalEvaluation);
  }
}

export default PhysicalEvaluationRepository;
