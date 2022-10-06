import { useSession } from 'next-auth/react';

import Image from 'next/image';

import { BigLogo } from '../src/components/BigLogo';
import { Login } from '../src/components/Login';


const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
      return (
        <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <BigLogo
            iconName='user'
            heading='Sign in required'
            subheading='to view your profile'
          />
          <Login message='Sign in now' />
        </div>
      );
    }

    if (session) {

      const tableData = {
        Name: session?.user?.name,
        Email: session?.user?.email,
        'Session Expires': new Date(session?.expires).toLocaleString(),
        'Google Sheet ID': process.env.NEXT_PUBLIC_SHEET_ID,
      };

      return (
        <section className=''>
          <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                {session?.user?.name ? `${session?.user?.name}'s` : '' } Profile
              </h3>
              <Image
                className='inline-block h-14 w-14 rounded-full mt-4'
                src={session?.user?.image}
                alt={`Avatar of ${session?.user?.name}`}
                width='96'
                height='96'
              />
            </div>

            <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
              <dl className='sm:divide-y sm:divide-gray-200'>
                <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                  {/* Print out the table */}
                  {Object.keys(tableData).map((element) => (
                    <>
                      <div className='mt-3'>
                        <dt className='text-sm font-medium text-gray-500'>
                          {element}
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 break-words'>
                          {tableData[element]}
                        </dd>
                      </div>
                    </>
                  ))}
                </div>
              </dl>
            </div>
          </div>
        </section>
      );
    }

};

export default Profile;
