import IImageManagementDTO from '../dtos/IImageManagementDTO'

interface IStorageProvider{
	saveFile(data: IImageManagementDTO): Promise<string>;
	deleteFile(data: IImageManagementDTO): Promise<void>;
}

export default IStorageProvider;
