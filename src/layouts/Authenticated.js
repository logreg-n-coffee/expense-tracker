import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const Authenticated = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }

  return <>{children}</>;
};
