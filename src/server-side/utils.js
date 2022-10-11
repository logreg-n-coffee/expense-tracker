import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

/**
 * getNextAuthToken receives a request from the client and returns the token
 * @param {*} req 
 * @returns token
 */
export async function getNextAuthToken(req) {
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

/**
 * authenticate takes in a token (access token) and returns a oauth2Client object
 * @param {*} token 
 * @returns oauth2Client
 */
export async function authenticate(token) {
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