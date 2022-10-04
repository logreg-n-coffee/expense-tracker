import { useSession } from 'next-auth/react';

import { BigLogo } from '../src/components/BigLogo';

const Profile = () => {
    const { data: session } = useSession();

    return (
      <div>
        <BigLogo />
        {session && <div>logged in</div>}
        {!session && <div>not logged in</div>}
      </div>
    );
};

export default Profile;
