import Link from "next/link";

import { BigLogo } from "../src/components/BigLogo";

const Custom404 = () => {
  return (
    <>
      <div className='flex min-h-full flex-col bg-white pt-16 pb-12'>
        <main className='mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-shrink-0 justify-center'>
            <BigLogo />
          </div>
          <div className='py-2'>
            <div className='text-center'>
              <p className='text-base font-semibold text-indigo-600'>404</p>
              <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                Page not found.
              </h1>
              <p className='mt-2 text-base text-gray-500'>
                Sorry, we could not find the page you are looking for.
              </p>
              <div className='mt-6'>
                <Link href='/'>
                  <a className='text-base font-medium text-indigo-600 hover:text-indigo-500'>
                    Go back home
                    <span aria-hidden='true'> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Custom404;
