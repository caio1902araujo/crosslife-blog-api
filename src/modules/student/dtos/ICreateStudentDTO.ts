import PhysicalEvaluation from '@modules/physicalEvaluation/infra/typeorm/entities/PhysicalEvaluation';
import Matriculation from '@modules/matriculation/infra/typeorm/entities/Matriculation';

interface ICreateStudentDTO {
  name: string,
  telephone: string,
  cpf: string,
  email: string,
  username: string,
  password: string,
  physicalEvaluation: PhysicalEvaluation,
  matriculation: Matriculation
}

export default ICreateStudentDTO;
