// NextAuth api routes

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // https://next-auth.js.org/providers/google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // https://next-auth.js.org/configuration/providers/oauth#authorization-option
        params: {
          // instead of specifying prompt, access_type, and response_type, we can also use the full url
          // url: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
          prompt: 'consent',
          access_type: 'offline', // offline access_type will
          response_type: 'code',
          // scope should be put within params
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/spreadsheets',
        },
      },
    }),
  ],
  // https://next-auth.js.org/configuration/callbacks
  // https://next-auth.js.org/getting-started/example
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      // Note: account will be there once when the user is signed in, hence the access_token
      // the if-condition here is to ensure access_token is not wiped out
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log('======token======\n', token);
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken;
      console.log('======session======\n', session);
      return session;
    },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
