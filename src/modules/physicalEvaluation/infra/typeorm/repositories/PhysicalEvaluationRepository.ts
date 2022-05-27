import { getRepository, Repository } from 'typeorm';

import PhysicalEvaluation from '../entities/PhysicalEvaluation';

import IPhysicalEvaluationRepository from '@modules/physicalEvaluation/repositories/IPhysicalEvaluationRepository';
import ICreatePhysicalEvaluationDTO from '@modules/physicalEvaluation/dtos/ICreatePhysicalEvaluationDTO';
import IFindAllPhysicalEvaluationDTO from '@modules/physicalEvaluation/dtos/IFindAllPhysicalEvaluationDTO';

class PhysicalEvaluationRepository implements IPhysicalEvaluationRepository{
	private ormRepository: Repository<PhysicalEvaluation>;

	constructor(){
		this.ormRepository = getRepository(PhysicalEvaluation);
	}

  public async delete(id:string) {
    await this.ormRepository.delete(id);
  }

  public async findAllPhysicalEvaluations({ name='',  username='', offset, limit}: IFindAllPhysicalEvaluationDTO): Promise<PhysicalEvaluation[]> {

    const physicalEvaluation = await this.ormRepository.createQueryBuilder('physical_evaluation')
    .leftJoinAndSelect("physical_evaluation.student", "student")
    .where("student.name ILIKE :name OR student.username = :username", {name: `%${name}%`, username: `%${username}%`})
    .select(['physical_evaluation.id, fat_mass', 'lean_mass', 'muscle_mass', 'bone_density', 'visceral_fat', 'basal_metabolism', 'hydration', 'name', 'username'])
    .offset(offset)
    .limit(limit)
    .execute();

    return physicalEvaluation;
  }

  public async findPhysicalEvaluationFromStudent(student_id: string): Promise<PhysicalEvaluation | undefined> {
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

  public async create(physicalEvaluationData: ICreatePhysicalEvaluationDTO): Promise<PhysicalEvaluation>{
    const physicalEvaluation = this.ormRepository.create(physicalEvaluationData);

    await this.ormRepository.save(physicalEvaluation);

    return physicalEvaluation
  }

  public async save(physicalEvaluation: PhysicalEvaluation): Promise<PhysicalEvaluation>{
    return await this.ormRepository.save(physicalEvaluation);
  }
}

export default PhysicalEvaluationRepository;
