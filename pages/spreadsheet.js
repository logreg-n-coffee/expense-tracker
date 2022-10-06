import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { BigLogo } from '../src/components/BigLogo';
import { Login } from '../src/components/Login';

const redirectToSpreadSheet = () => {
  return window.location.assign(
    `https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}`
  );
};

const Spreadsheet = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            setTimeout(() => redirectToSpreadSheet(), 20);
        }
    }), [session];

    return (
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        {session && (
          <>
            <BigLogo
              iconName='table'
              heading='Redirecting'
              subheading='to your spreadsheet'
            />
          </>
        )}
        {!session && (
          <>
            <BigLogo
              iconName='table'
              heading='Sign in required'
              subheading='Please sign in to view your spreadsheet'
            />
            <Login message='Sign in now' />
          </>
        )}
      </div>
    );
};

export default Spreadsheet;
