import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';

import IBudgetRepository from '../repositories/IBudgetRepository';
import IFindAllBudgetDTO from '../dtos/IFindAllBudgetDTO';

@injectable()
class ListBudgetsService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute({
    expense,
    paydayOrder,
    limit,
    offset,
  }: IFindAllBudgetDTO): Promise<[Budget[], number]> {
    const budgets = await this.budgetRepository.findAllBudgets({
      expense,
      paydayOrder,
      limit,
      offset,
    });

    return budgets;
  }
}

export default ListBudgetsService;
