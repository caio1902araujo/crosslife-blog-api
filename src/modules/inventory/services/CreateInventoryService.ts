import { injectable, inject } from 'tsyringe';

import Inventory from '../infra/typeorm/entities/Inventory';

import IInventoryRepository from '../repositories/IInventoryRepository';
import ICreateInventoryDTO from '../dtos/ICreateInventoryDTO';

@injectable()
class CreateInventoryService {
	constructor(
		@inject('InventoryRepository')
		private inventoryRepository: IInventoryRepository,
	){}

	public async execute({product, quantity, note}: ICreateInventoryDTO): Promise<Inventory>{

		const inventory = this.inventoryRepository.create({
			product,
			quantity,
			note,
		})

		return inventory;
	}
}

export default CreateInventoryService;
