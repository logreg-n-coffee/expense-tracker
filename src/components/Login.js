import { useSession, signIn, signOut } from 'next-auth/react';

export const Login = ({ message }) => {
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10'>
        <div className='mt-6 mb-6'>
          <div className='mt-6 mb-6 gap-3'>
            <div>
              <button
                className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                onClick={() => signIn()}
              >
                <span>{message}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
