export const Field = ({ children, label, optional = false }) => {
  return (
    <label className='block text-sm font-medium text-gray-700'>
      <span className='flex justify-between'>
        {label}
        {optional && <span className='text-sm text-gray-500'>Optional</span>}
      </span>
      {children}
    </label>
  );
};
