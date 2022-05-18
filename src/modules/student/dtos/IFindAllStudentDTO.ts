interface IFindAllStudentDTO {
  name: string,
  username: string,
  cpf: string,
  offset: number, //take
  limit: number, //skip
  order: 'DESC' | 'ASC'
}

export default IFindAllStudentDTO;
