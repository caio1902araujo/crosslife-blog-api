import { inject, injectable } from 'tsyringe';

import Inventory from '../infra/typeorm/entities/Inventory';

import IInventoryRepository from '../repositories/IInventoryRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  product: string;
  quantity: number;
  note: string;
}

@injectable()
class UpdateInventoryService {
  constructor(
    @inject('InventoryRepository')
    private inventoryRepository: IInventoryRepository,
  ) {}

  public async execute({
    id,
    product,
    quantity,
    note,
  }: IRequest): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);

    if (!inventory) {
      throw new AppError('Produto não existe.', 404);
    }

    inventory.product = product;
    inventory.quantity = quantity;
    inventory.note = note;

    return await this.inventoryRepository.save(inventory);
  }
}

export default UpdateInventoryService;
