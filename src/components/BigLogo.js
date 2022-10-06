import { SparklesIcon } from '@heroicons/react/24/solid';
import { TableCellsIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/solid';

export const BigLogo = ({ heading, subheading, iconName }) => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      {iconName === 'table' ? (
        <TableCellsIcon
          className='mx-auto h-12 w-auto'
          alt={`${heading} ${subheading}`}
          color='rgb(88,66,225)'
        />
      ) : iconName === 'user' ? (
        <UserIcon
          className='mx-auto h-12 w-auto'
          alt={`${heading} ${subheading}`}
          color='rgb(88,66,225)'
        />
      ) : (
        <SparklesIcon
          className='mx-auto h-12 w-auto'
          alt={`${heading} ${subheading}`}
          color='rgb(88,66,225)'
        />
      )}

      <h2 className='mt-6 text-center font-bold tracking-tight'>
        <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-indigo-500'>
          {heading}
        </p>
        <p className='text-sm text-indigo-500 mt-2'>{subheading}</p>
      </h2>
    </div>
  );
};
