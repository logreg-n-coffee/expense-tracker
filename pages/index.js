import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // if the session is logged in, redirect to the /expense-tracker page
  useEffect(() => {
    if (session) {
      router.push('/expense-tracker');
    }
  }, [session, router]);

  // Testing feature when session is logged in
  if (session) {
    return (
      <>
        <div className="text-center bg-green-600 text-white container mx-auto">
          Signed in as {session.user.email} <br />
        </div>
        <button
          className="bg-green-400 text-white hover:bg-green-500 ring-green-100 container mx-auto px-20 py-10 w-full h-full"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  // log in button
  return (
    <main>
      <div className="text-center bg-green-600 text-white container mx-auto">
        Not signed in <br />
      </div>
      <button
        className="bg-green-400 text-white hover:bg-green-500 ring-green-100 container mx-auto px-20 py-10 w-full h-full"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </main>
  );
};

export default Home;
