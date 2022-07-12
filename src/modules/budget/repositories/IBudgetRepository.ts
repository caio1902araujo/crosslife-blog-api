import Budget from '../infra/typeorm/entities/Budget';
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';
import IFindAllBudgetDTO from '../dtos/IFindAllBudgetDTO';

interface IBudgetRepository {
  findAllBudgets(data: IFindAllBudgetDTO): Promise<[Budget[], number]>;
  findById(id: string): Promise<Budget | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateBudgetDTO): Promise<Budget>;
  save(budget: Budget): Promise<Budget>;
}

export default IBudgetRepository;
