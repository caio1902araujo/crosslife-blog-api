interface IFindAllAuthorDTO {
  name: string,
  username: string,
  offset: number,
  limit: number,
  order: 'DESC' | 'ASC'
}

export default IFindAllAuthorDTO;
