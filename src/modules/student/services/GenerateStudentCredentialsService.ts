import { injectable, inject } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';

interface IResponse{
  username: string,
  password: string,
}

@injectable()
class GenerateStudentCredentialsService {
  constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,
	){}

  public async execute(fullName: string): Promise<IResponse>{
    const [firstName, middleName] = fullName.split(' ');
    let username = firstName.slice(0, 2).toLowerCase() + middleName;
    const password = Math.random().toString(36).slice(-7);

    const similarUsernames = await this.studentRepository.findAllSimilarUsernames(username)

    if(similarUsernames.length > 0){
      const lastIndex = similarUsernames.length-1
      const lastSimilarUsername = similarUsernames[lastIndex].username;
      let count;
      if(lastSimilarUsername.length !== username.length){
        const differenceLength = lastSimilarUsername.length - username.length;
        const numberUsername = lastSimilarUsername.slice(-differenceLength);
        count = parseInt(numberUsername) + 1;
      }
      else{
        count = 1;
      }
      username = `${username}${count}`;
    }

    return {
      username,
      password
    }
  }
}

export default GenerateStudentCredentialsService;
