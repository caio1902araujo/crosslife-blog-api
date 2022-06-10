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
      .createQueryBuilder('physicalEvaluation')
      .leftJoinAndSelect('physicalEvaluation.student', 'student')
      .where('student.name ILIKE :name AND student.username ILIKE :username', {
        name: `%${name}%`,
        username: `%${username}%`,
      })
      .select([
        'physicalEvaluation.id',
        'physicalEvaluation.fatMass',
        'physicalEvaluation.leanMass',
        'physicalEvaluation.muscleMass',
        'physicalEvaluation.boneDensity',
        'physicalEvaluation.visceralFat',
        'physicalEvaluation.basalMetabolism',
        'physicalEvaluation.hydration',
        'student.name',
        'student.username',
      ])
      .offset(offset)
      .limit(limit)
      .getMany();

    return physicalEvaluation;
  }

  public async findPhysicalEvaluationFromStudent(
    studentId: string,
  ): Promise<PhysicalEvaluation | undefined> {
    const findPhysicalEvaluation = await this.ormRepository.findOne({
      where: { studentId },
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
