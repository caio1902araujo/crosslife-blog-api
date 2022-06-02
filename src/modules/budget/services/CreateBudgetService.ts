import { injectable, inject } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';

import IBudgetRepository from '../repositories/IBudgetRepository';
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';

@injectable()
class CreateBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute({
    expense,
    value,
    payday,
    observation,
  }: ICreateBudgetDTO): Promise<Budget> {
    const budget = this.budgetRepository.create({
      expense,
      value,
      payday,
      observation,
    });

    return budget;
  }
}

export default CreateBudgetService;
