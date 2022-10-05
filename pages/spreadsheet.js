import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { BigLogo } from '../src/components/BigLogo';
import { Login } from '../src/components/Login';

const Spreadsheet = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            window.location.assign(
              `https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}`
            );
        }
    }, [session]);

    return (
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        {session && (
          <>
            <BigLogo
              heading='Redirecting'
              subheading='to your spreadsheet now'
            />
          </>
        )}
        {!session && (
          <>
            <BigLogo
              heading='Hey Hey'
              subheading='Please sign in to view your spreadsheet'
            />
            <Login message='Sign in now' />
          </>
        )}
      </div>
    );
};

export default Spreadsheet;
