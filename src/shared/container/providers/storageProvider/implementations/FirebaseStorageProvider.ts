import fs from 'fs';
import path from 'path';
import mime from 'mime';
import admin from 'firebase-admin';

import IStorageProvider from '../models/IStorageProvider';
import IImageManagementDTO from '../dtos/IImageManagementDTO';

import uploadConfig from '@config/upload';
import configFirebase from '@config/firebase';

class FirebaseStorageProvider implements IStorageProvider {
  private bucket;

  constructor(){
    admin.initializeApp({
      credential: admin.credential.cert(configFirebase),
      storageBucket: process.env.BUCKET,
    });

    this.bucket = admin.storage().bucket();
  }

  public async saveFile({categoryImage, file}: IImageManagementDTO): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const contentType = mime.getType(originalPath);

    const fileBucket = this.bucket.file(`${categoryImage}/${file}`);

    fs.createReadStream(originalPath).
    pipe(
      fileBucket.createWriteStream({
        metadata:{
          contentType: contentType,
        }
      })
    ).
    on('error', function(err) {console.log(err)}).
    on('finish', function() {console.log('upload performed successfully')});

		return file;
	}

	public async deleteFile({categoryImage, file}: IImageManagementDTO): Promise<void> {
    await this.bucket.file(`${categoryImage}/${file}`).delete();
	}
}

export default FirebaseStorageProvider
