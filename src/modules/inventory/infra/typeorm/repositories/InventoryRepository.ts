import { getRepository, Repository, ILike } from 'typeorm';

import Inventory from '../entities/Inventory';

import IInventoryRepository from '@modules/inventory/repositories/IInventoryRepository';
import ICreateInventoryDTO from '@modules/inventory/dtos/ICreateInventoryDTO';
import IFindAllInventoryDTO from '@modules/inventory/dtos/IFindAllInventoryDTO';

class InventoryRepository implements IInventoryRepository{
	private ormRepository: Repository<Inventory>;

	constructor(){
		this.ormRepository = getRepository(Inventory);
	}

  public async delete(id:string) {
    await this.ormRepository.delete(id);
  }

  public async findAllInventories({ product, quantityOrder, offset, limit }: IFindAllInventoryDTO): Promise<Inventory[]> {
    const inventory = await this.ormRepository.find({
      where: {
        product: ILike('%' + product + '%'),
      },
      order: {quantity: quantityOrder},
      take: limit,
      skip: offset,
    });

    return inventory;
  }

	public async findById(id: string): Promise<Inventory | undefined> {
		const findInventory = await this.ormRepository.findOne({
			where: { id },
		});

		return findInventory;
	}

  public async create(inventoryData: ICreateInventoryDTO): Promise<Inventory>{
    const inventory = this.ormRepository.create(inventoryData);

    await this.ormRepository.save(inventory);

    return inventory;
  }

  public async save(inventory: Inventory): Promise<Inventory>{
    return await this.ormRepository.save(inventory);
  }
}

export default InventoryRepository;
