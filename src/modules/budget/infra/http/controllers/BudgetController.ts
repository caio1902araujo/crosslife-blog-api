import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowBudgetService from '@modules/budget/services/ShowBudgetService';
import CreateBudgetService from '@modules/budget/services/CreateBudgetService';
import DeleteBudgetService from '@modules/budget/services/DeleteBudgetService';
import ListBudgetsService from '@modules/budget/services/ListBudgetsService';
import UpdateBudgetService from '@modules/budget/services/UpdateBudgetService';
import IFindAllBudgetDTO from '@modules/budget/dtos/IFindAllBudgetDTO';

class BudgetController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const showBudget = container.resolve(ShowBudgetService);
    const budget = await showBudget.execute(id);

    return response.json(budget);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteBudgetService = container.resolve(DeleteBudgetService);
    await deleteBudgetService.execute(id);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { expense, value, payday, observation } = request.body;

    const createBudgetService = container.resolve(CreateBudgetService);
    const budget = await createBudgetService.execute({
      expense,
      value,
      payday,
      observation,
    });

    return response.json(budget);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const budgetId = request.params.id;
    const { expense, value, payday, observation } = request.body;

    const updateBudgetService = container.resolve(UpdateBudgetService);
    const budget = await updateBudgetService.execute({
      budgetId,
      expense,
      value,
      payday,
      observation,
    });

    return response.json(budget);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { expense, paydayOrder, limit, offset } =
      request.query as IFindAllBudgetDTO;

    const listBudgetsService = container.resolve(ListBudgetsService);
    const budget = await listBudgetsService.execute({
      expense,
      paydayOrder,
      limit,
      offset,
    });

    return response.json(budget);
  }
}

export default BudgetController;
