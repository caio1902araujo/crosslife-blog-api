import { inject, injectable } from 'tsyringe';

import Inventory from '../infra/typeorm/entities/Inventory';

import IInventoryRepository from '../repositories/IInventoryRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowInventoryService{
	constructor(
		@inject('InventoryRepository')
		private inventoryRepository: IInventoryRepository,
	){}

	public async execute(id: string): Promise<Inventory> {
		const inventory = await this.inventoryRepository.findById(id);

		if(!inventory){
			throw new AppError('Produto não encontrado.', 404);
		}

		return inventory;
	}
}

export default ShowInventoryService;
