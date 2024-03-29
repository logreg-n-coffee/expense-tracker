import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { BigLogo } from '../src/components/BigLogo';
import { ClickButton } from '../src/components/ClickButton';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // if the session is logged in, redirect to the /main page
  useEffect(() => {
    if (session) {
      router.push('/main');
    }
  }, [session, router]);

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <BigLogo heading='Sparkle it' subheading='Your Expense Tracker' />
      <ClickButton
        message='Get started'
        actionFn={signIn}
      />
    </div>
  );

};

export default Home;
