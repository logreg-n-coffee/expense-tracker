import { useSession } from 'next-auth/react';

import { BigLogo } from '../src/components/BigLogo';
import { Login } from '../src/components/Login';

const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
      return (
        <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <BigLogo
            heading='Hey Hey'
            subheading='Please sign in to view your profile'
          />
          <Login message='Sign in now' />
        </div>
      );
    }

};

export default Profile;
