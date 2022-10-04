import { SparklesIcon } from '@heroicons/react/24/solid';

export const BigLogo = ({ heading, subheading }) => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <SparklesIcon
        className='mx-auto h-12 w-auto'
        alt={`${heading} ${subheading}`}
        color='rgb(88,66,225)'
      />

      <h2 className='mt-6 text-center font-bold tracking-tight'>
        <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-indigo-500'>
          {heading}
        </p>
        <p className='text-sm text-indigo-500'>{subheading}</p>
      </h2>
    </div>
  );
};
