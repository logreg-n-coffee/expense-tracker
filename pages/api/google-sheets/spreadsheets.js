// an api to interact with the spreadsheet files

import { google } from 'googleapis';

// import utility functions
import { getNextAuthToken, authenticate } from '../../../src/server-side/utils';

// The requested scope is https://www.googleapis.com/auth/drive.file
// The app can only See, edit, create, and delete only the specific Google Drive files you use with this app

const SpreadsheetsHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await getSpreadsheetIdsInDriveRoot();
    case 'POST':
      return await createABlankSheetWithCustomizedName();
    default:
      return res.status(405).end(`Not allowed. Received ${req.method}`);
  }

  async function getSpreadsheetIdsInDriveRoot() {
    const token = await getNextAuthToken(req);
    const oauth2Client = await authenticate(token);
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    try {
      const response = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
      });

      console.log('response data', response.data);
      res.json(response.data);

    } catch (err) {
      throw err;
    }
  }

  async function createABlankSheetWithCustomizedName() {
    const { body } = req;
    const parsedBody = JSON.parse(body);

    const token = await getNextAuthToken(req);
    const oauth2Client = await authenticate(token);
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    try {
      const response = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: parsedBody.title,
          },
        },
      });
      
      res.json(response.data);

    } catch (err) {
      console.error(err);
    }
  }

};

export default SpreadsheetsHandler;
