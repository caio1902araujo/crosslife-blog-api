import Trainer from '../infra/typeorm/entities/Trainer';
import ICreateTrainerDTO from '../dtos/ICreateTrainerDTO';
import IFindAllTrainerDTO from '../dtos/IFindAllTrainerDTO';

interface ITrainerRepository{
  findAllTrainers(data: IFindAllTrainerDTO) : Promise<Trainer[]>;
	findById(id: string): Promise<Trainer | undefined>;
	findByUsername(username: string): Promise<Trainer | undefined>;
	findByEmail(email: string): Promise<Trainer | undefined>;
  delete(id: string): Promise<void>;
	create(data: ICreateTrainerDTO): Promise<Trainer>;
	save(trainer: Trainer): Promise<Trainer>;
}

export default ITrainerRepository;
