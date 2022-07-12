import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';
import IFindAllStudentDTO from '../dtos/IFindAllStudentDTO';

interface IStudentRepository {
  findById(id: string): Promise<Student | undefined>;
  findAllStudents(data: IFindAllStudentDTO): Promise<[Student[], number]>;
  findByUsername(username: string): Promise<Student | undefined>;
  findAllSimilarUsernames(username: string): Promise<Student[]>;
  findByEmail(email: string): Promise<Student | undefined>;
  findByCPF(cpf: string): Promise<Student | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
}

export default IStudentRepository;
