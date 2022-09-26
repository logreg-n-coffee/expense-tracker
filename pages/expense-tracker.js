// component
import { Expense } from '../src/components/Expense';

// session 
import { useSession } from 'next-auth/react';

// router
import { useRouter } from 'next/router';

// effect
import { useEffect } from 'react';

const Expenses = () => {
  
  const { data: session } = useSession();
  const router = useRouter();

  // if not logged in, direct to the root page (index page)
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);
    

  return (
      <Expense />
  );
};

export default Expenses;
