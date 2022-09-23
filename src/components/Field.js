export const Field = ({ children, label, required = false }) => {
  return (
    <label className="flex flex-col text-gray-400">
      <span>
        {label}
        {required && <span className="text-red-500 text-sm">*</span>}
      </span>
      {children}
    </label>
  );
};
