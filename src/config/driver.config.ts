import { google } from 'googleapis';
import { join } from 'path';
import * as fs from 'fs';
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

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

// const filePath = join(__dirname, 'uploads');
const filePath = './uploads';
export const uploadFileToDriver = async (fileName: string) => {
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
