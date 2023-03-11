import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BigLogo } from '../src/components/BigLogo';
import { ClickButton } from '../src/components/ClickButton';

const Spreadsheet = () => {

  const { data: session } = useSession();

  const router = useRouter();
  const redirectToSpreadSheet = () => {
    router.push(`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}`);
  }

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {session && (
        <>
          <BigLogo
            iconName='table'
            heading='Click to Navigate'
            subheading='to the spreadsheet'
          />
          <ClickButton
            message='Navigate to Spreadsheet'
            actionFn={redirectToSpreadSheet}
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
          <ClickButton
            message='Sign in now'
            actionFn={signIn}
          />
        </>
      )}
    </div>
  );
};

export default Spreadsheet;
