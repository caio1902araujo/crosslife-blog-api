import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IInventoryRepository from '../repositories/IInventoryRepository';

@injectable()
class DeleteInventoryService {
  constructor(
    @inject('InventoryRepository')
		private inventoryRepository: IInventoryRepository,
	){}

  public async execute(id:string): Promise<void> {
    const inventory = await this.inventoryRepository.findById(id);

    if(!inventory){
      throw new AppError('Esse produto não existe', 404);
    }

    await this.inventoryRepository.delete(id);
  }
}

export default DeleteInventoryService;
