interface IFindAllInventoryDTO {
  product?: string,
  quantityOrder?: 'DESC' | 'ASC',
  offset?: number,
  limit?: number,
}

export default IFindAllInventoryDTO;
