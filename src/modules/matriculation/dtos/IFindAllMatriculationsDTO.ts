interface IFindAllMatriculationsDTO {
  active?: boolean;
  type?: string;
  orderCreatedAt?: 'ASC' | 'DESC';
  username?: string;
  offset?: number;
  limit?: number;
}

export default IFindAllMatriculationsDTO;
