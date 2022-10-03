import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SparklesIcon } from '@heroicons/react/24/solid';

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
    <>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <SparklesIcon
            className='mx-auto h-12 w-auto'
            alt='Sparkle it - Your Expense Tracker'
            color='rgb(88,66,225)'
          />

          <h2 className='mt-6 text-center font-bold tracking-tight'>
            <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-indigo-500'>
              Sparkle it!
            </p>
            <p className='text-sm text-indigo-500'>Your Expense Tracker</p>
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='mt-6 mb-6'>
              <div className='mt-6 mb-6 gap-3'>
                <div>
                  <button
                    className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                    onClick={() => signIn()}
                  >
                    <span>Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default Home;
