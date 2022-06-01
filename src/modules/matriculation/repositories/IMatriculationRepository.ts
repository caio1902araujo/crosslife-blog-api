import Matriculation from '../infra/typeorm/entities/Matriculation';
import IFindAllMatriculationsDTO from '../dtos/IFindAllMatriculationsDTO';

interface IMatriculationRepository{
  findAllMatriculations(data: IFindAllMatriculationsDTO): Promise<Matriculation[]>;
	findById(id: string): Promise<Matriculation | undefined>;
	save(matriculation: Matriculation): Promise<Matriculation>;
}

export default IMatriculationRepository;
