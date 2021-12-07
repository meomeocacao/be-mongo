import { AWS_CONSTANTS } from '@/core';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
const s3 = new S3({
  accessKeyId: AWS_CONSTANTS.AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_CONSTANTS.AWS_SECRET_ACCESS_KEY,
  region: AWS_CONSTANTS.BUCKET_REGION,
});

@Injectable()
export class AwsService {
  async uploadAWSFile(file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);
    // const path = './uploads' + '/' + file.filename;
    const params = {
      Bucket: AWS_CONSTANTS.BUCKET_NAME,
      Key: file.filename,
      // Body: file.path,
      Body: fileStream,
      ACL: 'public-read',
    };
    const res = await s3.upload(params).promise();
    console.log(res);
    return res;
  }

  async getAWSFileUrl(fileName: string) {
    const params = {
      Bucket: AWS_CONSTANTS.BUCKET_NAME,
      Key: fileName,
    };
    const url = s3.getSignedUrl('getObject', params);
    return url;
  }
}
