const variants = {
  primary:
    'inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  secondary:
    'inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
};

const defaultStyles =
  'disabled:opacity-50';

export const Button = ({ variant = 'primary', ...p }) => {
  const { className, ...props } = p;
  return (
    <button
      className={`${defaultStyles} ${variants[variant]} ${p.className}`}
      {...props}
    />
  );
};
