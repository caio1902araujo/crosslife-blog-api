import { getRepository, Repository } from 'typeorm';

import IStudentTokenRepository from '@modules/student/repositories/IStudentTokenRepository';
import StudentToken from '../entities/StudentToken';

class StudentTokenRepository implements IStudentTokenRepository {
  private ormRepository: Repository<StudentToken>;

  constructor() {
    this.ormRepository = getRepository(StudentToken);
  }

  public async generate(studentId: string): Promise<StudentToken> {
    const userToken = this.ormRepository.create({
      studentId,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<StudentToken | undefined> {
    const findToken = await this.ormRepository.findOne({
      where: { token },
    });

    return findToken;
  }
}

export default StudentTokenRepository;
