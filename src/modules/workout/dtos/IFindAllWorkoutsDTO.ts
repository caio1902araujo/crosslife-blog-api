interface IFindAllWorkoutsDTO {
  trainer_id?: string;
  title?: string;
  dateOrder?: 'DESC' | 'ASC';
  offset?: number;
  limit?: number;
}

export default IFindAllWorkoutsDTO;
