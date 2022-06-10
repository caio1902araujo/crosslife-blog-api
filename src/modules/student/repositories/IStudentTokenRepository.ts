import StudentToken from '../infra/typeorm/entities/StudentToken';

interface IStudentTokenRepository {
  generate(studentId: string): Promise<StudentToken>;
  findByToken(token: string): Promise<StudentToken | undefined>;
}

export default IStudentTokenRepository;
