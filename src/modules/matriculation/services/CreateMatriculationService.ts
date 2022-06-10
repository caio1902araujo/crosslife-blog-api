import Matriculation from '../infra/typeorm/entities/Matriculation';

interface IRequest {
  active: boolean;
  type: string;
}

class CreateMatriculationService {
  public async execute({ active, type }: IRequest): Promise<Matriculation> {
    const matriculation = new Matriculation();
    const creationDate = new Date();

    Object.assign(matriculation, {
      active,
      type,
      finishedAt: new Date(
        creationDate.getFullYear() + 1,
        creationDate.getMonth(),
        creationDate.getDate(),
      ),
    });

    return matriculation;
  }
}

export default CreateMatriculationService;
