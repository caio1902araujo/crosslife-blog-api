interface IFindAllWorkoutsDTO {
  trainerId?: string;
  title?: string;
  dateOrder?: 'DESC' | 'ASC';
  offset?: number;
  limit?: number;
}

export default IFindAllWorkoutsDTO;
