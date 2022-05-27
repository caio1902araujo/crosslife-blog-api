import PhysicalEvaluation from '@modules/physicalEvaluation/infra/typeorm/entities/PhysicalEvaluation';

interface ICreateStudentDTO {
  name: string,
  telephone: string,
  cpf: string,
  email: string,
  username: string,
  password: string,
  physicalEvaluation: PhysicalEvaluation
}

export default ICreateStudentDTO;
