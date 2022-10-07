// an api to interact with the spreadsheet files

import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const SpreadsheetsHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getSpreadsheetIdsInDriveRoot();
    default:
      return res.status(405).end(`Not allowed. Received ${req.method}`);
  }

  async function getSpreadsheetIdsInDriveRoot() {
    // get the access_token from next-auth
    const token = await getToken({ req, secret });

    if (!token) {
      res
        .status(401)
        .end(
          'Not authorized. Expected a token from the login session, but received none.'
        );
    }

    // authenticate with google oauth client
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const accessToken = token?.accessToken;

    const oauth2Client = new google.auth.OAuth2({
      clientId,
      clientSecret,
    });

    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    let files = [];

    try {
      const res = await drive.files.list({
        q: 'mimeType=',
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
      });

      files = Array.from(res).forEach(response => response.files);

      console.log(files);
      
    } catch (err) {
      throw err;
    }


  }
};

export default SpreadsheetsHandler;
