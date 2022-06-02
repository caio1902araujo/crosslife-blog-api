import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IBudgetRepository from '../repositories/IBudgetRepository';

@injectable()
class DeleteBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new AppError('Despesa não encontrada', 404);
    }

    await this.budgetRepository.delete(id);
  }
}

export default DeleteBudgetService;
