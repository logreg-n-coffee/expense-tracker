// an api to interact with the Google Spreadsheet (through googleapis) on worksheet named 'expenses'

import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

// load the client side self-generated secret from environment variable
const secret = process.env.NEXTAUTH_SECRET;

const ExpensesHandler = async (req, res) => {
    // As we are adding expenses, make sure the req.method is 'POST
    if (req.method === 'POST') {
      // get token from the login session
      const token = await getToken({ req, secret });

      if (!token) {
        res.status(401);
      }

      // destruct the request body 
      const { body } = req;

      // process the data 
      const parsedBody = JSON.parse(body);

      // prepare the data for POST request
      const values = [
        [
          parsedBody.date,
          parsedBody.category,
          parsedBody.description,
          parsedBody.amount,
        ],
      ];

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
        access_token: accessToken,
      });

      const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

      const range = `${process.env.EXPENSES_SHEET_NAME ?? 'expenses'}!A1:C1`;

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      res.json(response.data);
      console.log(response.data);
    
    } else {
        res.status(404);
    }
};

export default ExpensesHandler;
