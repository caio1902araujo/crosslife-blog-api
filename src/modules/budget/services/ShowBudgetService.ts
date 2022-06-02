import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';

import IBudgetRepository from '../repositories/IBudgetRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute(id: string): Promise<Budget> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new AppError('Despesa não encontrada.', 404);
    }

    return budget;
  }
}

export default ShowBudgetService;
