// an api to interact with the spreadsheet files

import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

// The requested scope is https://www.googleapis.com/auth/drive.file
// The app can only See, edit, create, and delete only the specific Google Drive files you use with this app

// helper functions
async function getNextAuthToken(req) {
  // get the next-auth secret
  const secret = process.env.NEXTAUTH_SECRET;

  // get the access_token from next-auth
  const token = await getToken({ req, secret });

  if (!token) {
    res
      .status(401)
      .end(
        'Not authorized. Expected a token from the login session, but received none.'
      );
  }
  return token;
}

async function authenticate(token) {
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

  return oauth2Client;
}

const SpreadsheetsHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await getSpreadsheetIdsInDriveRoot();
    case 'POST':
      return await createABlankSheet();
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

  async function createABlankSheet() {
    console.log('running createABlankSheet');

    const { body } = req;

    // console.log(body);

    // const parsedBody = JSON.parse(body);

    // console.log('the parsed request body is: ', parsedBody);
  }

};

export default SpreadsheetsHandler;
