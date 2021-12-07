import { google } from 'googleapis';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PATH_FILE } from '@/core';
export const OAUTH_CONFIG_DRIVER = {
  clientId:
    '279845769062-uo6cj093cu678p5rtag6g8lmm7ojn4oh.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'https://developers.google.com/oauthplayground',
  refreshToken:
    '1//04uf6APOa4ip1CgYIARAAGAQSNwF-L9IrWOdoAkZ5Bka_iErnBhOf3ATU0GHR6pCM4lLMF6ViTapZteuys23yH6BqOkROfIcW0Ls',
};

const oauth2Client = new google.auth.OAuth2(
  OAUTH_CONFIG_DRIVER.clientId,
  OAUTH_CONFIG_DRIVER.clientSecret,
  OAUTH_CONFIG_DRIVER.redirectUri,
);

oauth2Client.setCredentials({
  refresh_token: OAUTH_CONFIG_DRIVER.refreshToken,
});

export const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

@Injectable()
export class DriverService {
  async uploadFileToDriver(fileName: string): Promise<string> {
    const respone = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(PATH_FILE + '/' + fileName),
      },
    });
    if (!respone.data.id) {
      return '';
    }
    return respone.data.id;
  }
  async getUrlOfDriver(fileName: string): Promise<string> {
    const fileId = await this.uploadFileToDriver(fileName);
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    const result = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });
    if (!result.data.webContentLink) {
      return '';
    }
    return result.data.webContentLink;
  }
}
