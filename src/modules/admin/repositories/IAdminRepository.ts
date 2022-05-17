import Admin from '../infra/typeorm/entities/Admin';

interface IAdminRepository{
	findByUsername(email: string): Promise<Admin | undefined>;
	findById(id: string): Promise<Admin | undefined>;
}

export default IAdminRepository;
