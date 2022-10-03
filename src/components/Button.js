const variants = {
  primary:
    'items-center rounded border border-transparent bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  secondary:
    'items-center rounded border border-transparent bg-indigo-100 font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
};

const defaultStyles =
  'disabled:opacity-25 rounded font-bold text-lg ring-4 shadow-sm';

export const Button = ({ variant = 'primary', ...p }) => {
  const { className, ...props } = p;
  return (
    <button
      className={`${defaultStyles} ${variants[variant]} ${p.className}`}
      {...props}
    />
  );
};
