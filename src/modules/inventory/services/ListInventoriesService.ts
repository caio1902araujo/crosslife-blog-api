import { inject, injectable } from 'tsyringe';

import Inventory from '../infra/typeorm/entities/Inventory';

import IInventoryRepository from '../repositories/IInventoryRepository';
import IFindAllAuthorDTO from '../dtos/IFindAllInventoryDTO';

@injectable()
class ListInventoriesService{
	constructor(
		@inject('InventoryRepository')
		private inventoryRepository: IInventoryRepository,
	){}

	public async execute({ product, quantityOrder, limit, offset }: IFindAllAuthorDTO): Promise<Inventory[]> {
		const inventories = await this.inventoryRepository.findAllInventories({ product, quantityOrder, limit, offset });

		return inventories;
	}
}

export default ListInventoriesService;
