interface IFindAllNewsByIdAuhorDTO {
  authorId?: string;
  category?: string;
  order?: 'ASC' | 'DESC';
  title?: string;
  offset?: number;
  limit?: number;
}

export default IFindAllNewsByIdAuhorDTO;
