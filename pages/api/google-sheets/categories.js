// an api to interact with the Google Spreadsheet on worksheet named 'categories'

// google api node.js client 
import { google } from 'googleapis';

// jwt token 
import { getToken } from 'next-auth/jwt';

// load the client side self-generated secret from environment variable
const secret = process.env.SECRET;

const CategoriesHandler = async (req, res) => {
    // get token from the login session 
    const token = await getToken({ req, secret });

    if (!token) {
        res.status(401);
    }

    // load in the variables to access the google api auth client
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const accessToken = token?.accessToken;

    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret
    });

    oauth2Client.setCredentials({
      accessToken: accessToken,
    });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const range = `${process.env.CATEGORIES_SHEET_NAME ?? 'categories'}!A2:B`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    });

    res.json(response.data);
    console.log(response.data);
};

export default CategoriesHandler;
