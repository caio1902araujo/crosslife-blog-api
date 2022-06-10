import { inject, injectable } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';

import IBudgetRepository from '../repositories/IBudgetRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  expense: string;
  value: number;
  payday: Date;
  observation: string;
}

@injectable()
class UpdateBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute({
    id,
    expense,
    value,
    payday,
    observation,
  }: IRequest): Promise<Budget> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new AppError('Despesa não foi encontrada.', 404);
    }

    budget.expense = expense;
    budget.value = value;
    budget.payday = payday;
    budget.observation = observation;

    return await this.budgetRepository.save(budget);
  }
}

export default UpdateBudgetService;
