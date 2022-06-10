import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowInventoryService from '@modules/inventory/services/ShowInventoryService';
import CreateInventoryService from '@modules/inventory/services/CreateInventoryService';
import DeleteInventoryService from '@modules/inventory/services/DeleteInventoryService';
import ListInventoriesService from '@modules/inventory/services/ListInventoriesService';
import UpdateInventoryService from '@modules/inventory/services/UpdateInventoryService';
import IFindAllInventoryDTO from '@modules/inventory/dtos/IFindAllInventoryDTO';

class InventoryController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const showInventory = container.resolve(ShowInventoryService);
    const inventory = await showInventory.execute(id);

    return response.json(inventory);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteInventoryService = container.resolve(DeleteInventoryService);
    await deleteInventoryService.execute(id);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product, quantity, note } = request.body;

    const createInventoryService = container.resolve(CreateInventoryService);
    const inventory = await createInventoryService.execute({
      product,
      quantity,
      note,
    });

    return response.json(inventory);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const { product, quantity, note } = request.body;

    const updateInventoryService = container.resolve(UpdateInventoryService);
    const inventory = await updateInventoryService.execute({
      id,
      product,
      quantity,
      note,
    });

    return response.json(inventory);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { product, quantityOrder, limit, offset } =
      request.query as IFindAllInventoryDTO;

    const listInventoriesService = container.resolve(ListInventoriesService);
    const inventory = await listInventoriesService.execute({
      product,
      quantityOrder,
      limit,
      offset,
    });

    return response.json(inventory);
  }
}

export default InventoryController;
