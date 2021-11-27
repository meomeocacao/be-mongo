import { Injectable } from '@nestjs/common';
import { drive } from '../driver.config';
import * as fs from 'fs';
const filePath = './uploads';
@Injectable()
export class DriverBlobService {
  uploadFileToDriver = async (fileName: string) => {
    try {
      const respone = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: 'image/jpg',
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath + '/' + fileName),
        },
      });
      // return respone.data.id;
      await drive.permissions.create({
        fileId: respone.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      const result = await drive.files.get({
        fileId: respone.data.id,
        fields: 'webViewLink, webContentLink',
      });
      // console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
}
