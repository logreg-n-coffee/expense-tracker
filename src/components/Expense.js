import { ExpenseForm } from './ExpenseForm';

export const Expense = () => {
  return (
    <section
      className='
        rounded flex flex-col bg-white shadow-xl 
        sm:mx-auto sm:w-full sm:max-w-md
        mt-0 sm:mt-24'
    >
      <div className='rounded w-full flex justify-center px-4 py-4 bg-indigo-500 text-white border-b-2 border-indigo-200'>
        <span className='font-bold text-lg text-center'>Expense</span>
      </div>

      <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <ExpenseForm />
      </div>
    </section>
  );
};
