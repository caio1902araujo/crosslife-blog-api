import { getRepository, Repository, ILike } from 'typeorm';

import Trainer from '../entities/Trainer';

import ITrainerRepository from '@modules/trainer/repositories/ITrainerRepository';
import ICreateTrainerDTO from '@modules/trainer/dtos/ICreateTrainerDTO';
import IFindAllTrainerDTO from '@modules/trainer/dtos/IFindAllTrainerDTO';

class TrainerRepository implements ITrainerRepository{
	private ormRepository: Repository<Trainer>;

	constructor(){
		this.ormRepository = getRepository(Trainer);
	}

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllTrainers({name, username, offset, limit}: IFindAllTrainerDTO): Promise<Trainer[]> {
    const trainers = this.ormRepository.find({
      where: {
        name: ILike('%' + name + '%'),
        username: ILike('%' + username + '%'),
      },
      take: limit,
      skip: offset,
    });

    return trainers;
  }

	public async findById(id: string): Promise<Trainer | undefined> {
		const findTrainer = await this.ormRepository.findOne({
			where: {id: id},
		});

		return findTrainer;
	}

  public async findByUsername(username: string): Promise<Trainer | undefined> {
		const findTrainer = await this.ormRepository.findOne({
			where: { username },
		});

		return findTrainer;
	}

  public async findByEmail(email: string): Promise<Trainer | undefined> {
		const findTrainer = await this.ormRepository.findOne({
			where: { email },
		});

		return findTrainer;
	}

  public async create(trainerData: ICreateTrainerDTO): Promise<Trainer>{
    const trainer = this.ormRepository.create(trainerData);

    await this.ormRepository.save(trainer);

    return trainer
  }

  public async save(trainer: Trainer): Promise<Trainer>{
    return await this.ormRepository.save(trainer);
  }
}

export default TrainerRepository;
