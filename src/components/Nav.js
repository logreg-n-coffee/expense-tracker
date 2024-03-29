// basic components
import Link from 'next/link';

import { SparklesIcon } from '@heroicons/react/24/solid'

// session state 
import { signIn, signOut, useSession } from 'next-auth/react';

// navigation items
const navigation = [
  { name: 'Sparkle it!', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Spreadsheet', href: '/spreadsheet' }
];


export const Nav = () => {

  const { data: session } = useSession();

  return (
    <header className='bg-indigo-600'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none'>
          <div className='flex items-center text-white'>
            <Link href='/'>
              <a>
                <span className='sr-only'>Sparkle it - Your Expense Tracker</span>
                <SparklesIcon className='h-8 w-8' />
              </a>
            </Link>
            <div className='ml-10 hidden space-x-8 lg:block'>
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='text-base font-medium text-white hover:text-indigo-50'
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            {!session && (
              <button
                onClick={() => signIn()}
                className='inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
              >
                Sign In
              </button>
            )}
            {session && (
              <button
                onClick={() => signOut()}
                className='inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-6 py-4 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-indigo-50'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
