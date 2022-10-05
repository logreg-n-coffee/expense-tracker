import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Login } from '../src/components/Login';
import { BigLogo } from '../src/components/BigLogo';

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
      <Login message='Get started' />
    </div>
  );

};

export default Home;
