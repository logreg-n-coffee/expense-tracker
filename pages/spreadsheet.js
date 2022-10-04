import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

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
      <div>
        {session && (
          <div>Redirecting...</div>
        )}
        {!session && (
          <div>Not signed in, please sign in to view your spreadsheet.</div>
        )}
      </div>
    );
};

export default Spreadsheet;
