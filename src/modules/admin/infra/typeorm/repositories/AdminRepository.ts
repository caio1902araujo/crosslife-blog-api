import { getRepository, Repository } from 'typeorm';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';

import Admin from '@modules/admin/infra/typeorm/entities/Admin';

class AdminRepository implements IAdminRepository{
	private ormRepository: Repository<Admin>;

	constructor(){
		this.ormRepository = getRepository(Admin);
	}

	public async findByUsername(username: string): Promise<Admin | undefined> {
		const findAdmin = await this.ormRepository.findOne({
			where: { username },
		});

		return findAdmin;
	}

  public async findById(id: string): Promise<Admin | undefined> {
		const findAdmin = await this.ormRepository.findOne({
			where: { id },
		});

		return findAdmin;
	}
}

export default AdminRepository;
