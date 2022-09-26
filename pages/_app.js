// NextAuth provider
import { SessionProvider } from 'next-auth/react';

// TanStack react-query provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// layout
import { MainLayout } from '../src/layouts/Main'; // MainLayout includes the Nav bar and the expense form
import '../styles/globals.css';

// create a react-query client
const queryClient = new QueryClient();

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
