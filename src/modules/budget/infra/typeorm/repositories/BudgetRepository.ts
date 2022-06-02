import { getRepository, Repository, ILike } from 'typeorm';

import Budget from '../entities/Budget';

import IBudgetRepository from '@modules/budget/repositories/IBudgetRepository';
import ICreateBudgetDTO from '@modules/budget/dtos/ICreateBudgetDTO';
import IFindAllBudgetDTO from '@modules/budget/dtos/IFindAllBudgetDTO';

class BudgetRepository implements IBudgetRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  public async delete(id: string) {
    await this.ormRepository.delete(id);
  }

  public async findAllBudgets({
    expense,
    paydayOrder,
    offset,
    limit,
  }: IFindAllBudgetDTO): Promise<Budget[]> {
    const budget = await this.ormRepository.find({
      where: {
        expense: ILike('%' + expense + '%'),
      },
      order: { payday: paydayOrder },
      take: limit,
      skip: offset,
    });

    return budget;
  }

  public async findById(id: string): Promise<Budget | undefined> {
    const findBudget = await this.ormRepository.findOne({
      where: { id },
    });

    return findBudget;
  }

  public async create(budgetData: ICreateBudgetDTO): Promise<Budget> {
    const budget = this.ormRepository.create(budgetData);

    await this.ormRepository.save(budget);

    return budget;
  }

  public async save(budget: Budget): Promise<Budget> {
    return await this.ormRepository.save(budget);
  }
}

export default BudgetRepository;
