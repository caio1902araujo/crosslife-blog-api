import { getRepository, Repository } from 'typeorm';

import Matriculation from '../entities/Matriculation';

import IMatriculationRepository from '@modules/matriculation/repositories/IMatriculationRepository';
import IFindAllMatriculationsDTO from '@modules/matriculation/dtos/IFindAllMatriculationsDTO';

class MatriculationRepository implements IMatriculationRepository {
  private ormRepository: Repository<Matriculation>;

  constructor() {
    this.ormRepository = getRepository(Matriculation);
  }

  public async findAllMatriculations({
    active,
    type,
    orderCreatedAt,
    username,
    offset,
    limit,
  }: IFindAllMatriculationsDTO): Promise<Matriculation[]> {
    let queryMatriculation = this.ormRepository
      .createQueryBuilder('matriculation')
      .leftJoinAndSelect('matriculation.student', 'student')
      .where('student.username ILIKE :username', { username: `%${username}%` })
      .select([
        'matriculation.id',
        'matriculation.active',
        'matriculation.type',
        'matriculation.createdAt',
        'matriculation.finishedAt',
        'student.name',
        'student.username',
      ])
      .orderBy('createdAt', orderCreatedAt)
      .offset(offset)
      .limit(limit);

    if (type !== undefined) {
      queryMatriculation = queryMatriculation.andWhere('type = :type', {
        type: `${type}`,
      });
    }
    if (active !== undefined) {
      queryMatriculation = queryMatriculation.andWhere('active = :active', {
        active: active,
      });
    }

    const matriculations = await queryMatriculation.getMany();

    return matriculations;
  }

  public async findById(id: string): Promise<Matriculation | undefined> {
    const findMatriculation = await this.ormRepository.findOne({
      where: { id },
    });

    return findMatriculation;
  }

  public async save(matriculation: Matriculation): Promise<Matriculation> {
    return await this.ormRepository.save(matriculation);
  }
}

export default MatriculationRepository;
