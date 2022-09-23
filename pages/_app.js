import { MainLayout } from "../src/layouts/Main";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
