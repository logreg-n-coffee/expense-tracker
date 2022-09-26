// components
import Link from 'next/link';
import { Button } from './Button';

// session state 
import { signIn, signOut, useSession } from 'next-auth/react';


export const Nav = () => {

  const { data: session } = useSession();

  return (
    <nav className="bg-white px-1 py-8 w-full flex items-center justify-around">
      <h1 className="text-xl font-bold text-green-600 tracking-wide">
        <Link href="/" passHref>
          <a>Expense Tracker 💰</a>
        </Link>
      </h1>
      {/** if not logged in show log in option */}
      {!session && (
        <Button
          className="w-28 py-2 px-2 flex items-center gap-2"
          variant="outline"
          onClick={() => signIn()}
        >
          Log In
        </Button>
      )}
      {/** if logged in show log out option */}
      {session && (
        <Button
          className="w-28 py-2 px-2 flex items-center gap-2"
          variant="outline"
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      )}
    </nav>
  );
};
