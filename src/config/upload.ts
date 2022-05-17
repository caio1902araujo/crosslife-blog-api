import path from 'path';
import crypto from 'crypto';
import multer, {StorageEngine}from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 'firebase' | 'disk';
  tmpFolder: string;
  uploadFolder: string;
  storage: StorageEngine;
}

export default{
  driver: process.env.UPLOAD_DRIVER,
	tmpFolder,
	uploadFolder: path.resolve(tmpFolder, 'upload'),
	storage: multer.diskStorage({
		destination: tmpFolder,
		filename(request, file, callback){
			const fileHash = crypto.randomBytes(10).toString('hex');
			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		}
	})
} as IUploadConfig
