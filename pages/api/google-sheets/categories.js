// an api to interact with the Google Spreadsheet (through googleapis) on worksheet named 'categories'

// google api node.js client 
import { google } from 'googleapis';

// jwt token 
import { getToken } from 'next-auth/jwt';

// load the client side self-generated secret from environment variable
const secret = process.env.NEXTAUTH_SECRET;

const CategoriesHandler = async (req, res) => {
  // get token from the login session
  const token = await getToken({ req, secret });

  // console.log('======token from handler======\n', token);

  if (!token) {
    res.status(401);
  }

  // load in the variables to access the google api auth client
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const accessToken = token?.accessToken;

  // https://github.com/googleapis/google-api-nodejs-client#readme
  const oauth2Client = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });

  oauth2Client.setCredentials({
    // property name is access_token but not accessToken
    access_token: accessToken,
  });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

  const range = `${process.env.CATEGORIES_SHEET_NAME ?? 'categories'}!A2:B`;

  try {
    const response = await sheets.spreadsheets.values.get({
      // request params
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    res.json(response.data);
    // console.log(response.data);

  } catch (err) {
    throw new Error(err);
  }

};

export default CategoriesHandler;
