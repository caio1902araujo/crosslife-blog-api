interface IFindAllBudgetDTO {
  expense?: string;
  paydayOrder?: 'DESC' | 'ASC';
  offset?: number;
  limit?: number;
}

export default IFindAllBudgetDTO;
