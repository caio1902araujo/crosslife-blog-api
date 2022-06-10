import { injectable, inject } from 'tsyringe';

import Trainer from '../infra/typeorm/entities/Trainer';

import ITrainerRepository from '../repositories/ITrainerRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  trainerId: string;
  categoryImage: string;
  avatarFilename: string;
}

@injectable()
class UpdateTrainerAvatarService {
  constructor(
    @inject('TrainerRepository')
    private trainerRepository: ITrainerRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    trainerId,
    categoryImage,
    avatarFilename,
  }: IRequest): Promise<Trainer> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new AppError('Treinador(a) não encontrado(a)', 404);
    }

    if (trainer.avatar) {
      this.storageProvider.deleteFile({ categoryImage, file: trainer.avatar });
    }

    const fileName = await this.storageProvider.saveFile({
      categoryImage,
      file: avatarFilename,
    });

    trainer.avatar = fileName;
    this.trainerRepository.save(trainer);

    return trainer;
  }
}

export default UpdateTrainerAvatarService;
