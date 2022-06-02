import Inventory from '../infra/typeorm/entities/Inventory';
import ICreateInventoryDTO from '../dtos/ICreateInventoryDTO';
import IFindAllInventoryDTO from '../dtos/IFindAllInventoryDTO';

interface IInventoryRepository{
  findAllInventories(data: IFindAllInventoryDTO): Promise<Inventory[]>;
	findById(id: string): Promise<Inventory | undefined>;
  delete(id: string): Promise<void>;
	create(data: ICreateInventoryDTO): Promise<Inventory>;
	save(budget: Inventory): Promise<Inventory>;
}

export default IInventoryRepository;
