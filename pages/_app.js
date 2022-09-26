import { SessionProvider } from 'next-auth/react';

import { MainLayout } from '../src/layouts/Main'; // MainLayout includes the Nav bar and the expense form
import '../styles/globals.css';

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;
