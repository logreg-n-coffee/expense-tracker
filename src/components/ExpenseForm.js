// components
import { Button } from './Button';
import { Field } from './Field';

// useState
import { useState } from 'react';

// react hook form - https://react-hook-form.com
import { useForm } from 'react-hook-form';

// react notifications
import toast from 'react-hot-toast';

// connect to the hook that communicate with the server api
import { useCategories } from '../hooks/useCategories';  // created with useQuery

// useMutation to create expenses
import { useMutation } from '@tanstack/react-query';

// currency input
import CurrencyInput from 'react-currency-input-field';

// icons
import { CalendarIcon } from '@heroicons/react/24/solid';


export const ExpenseForm = () => {
  // retrieve the categories from the Google Sheets
  const { data } = useCategories();

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  // expenses mutation
  // counter for 5 counts
  const [count, setCount] = useState(0);

  // https://react-hook-form.com/api/useform/
  const { isLoading, mutate } = useMutation(
    ['expenses'],
    (values) =>
      fetch('/api/google-sheets/expenses', {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .catch((err) => err.json()),
    {
      onSuccess: () => {
        const nextCount = count + 1;
        setCount(nextCount);
        toast.success(
          nextCount === 5 ? 'Wow! 5 in a row' : 'Added one expense'
        );
      },
      onError: (err) => {
        toast.error('Something went wrong');
      },
    }
  );

  // onSubmit event
  const onSubmit = (data) => mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-10 h-full'
    >
      <div className='flex flex-col gap-4'>
        <Field label='Amount'>
          <div className='relative mt-1 rounded-md shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <span className='text-gray-500 sm:text-sm'>$</span>
            </div>
            <CurrencyInput
              {...register('amount', { required: true })}
              type='text'
              className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='0.00'
              groupSeparator=','
              decimalSeparator='.'
            />
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <span className='text-gray-500 sm:text-sm'>USD</span>
            </div>
          </div>
        </Field>

        <Field label='Date'>
          <div className='relative flex flex-grow items-stretch focus-within:z-10'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <CalendarIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              {...register('date', { required: true })}
              className='block w-full rounded-md pl-10 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              type='date'
            />
          </div>
        </Field>

        <Field label='Category'>
          <select
            {...register('category', { required: true })}
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          >
            {data?.values?.map(([id, category]) => (
              <option key={id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Description' optional>
          <input
            {...register('description')}
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            type='text'
            placeholder='A cupcake'
          />
        </Field>
      </div>

      <div className='sm:grid sm:grid-cols-4 sm:gap-2 grid grid-flow-row gap-1'>
        <div className='sm:col-span-3'>
          <Button disabled={!isValid} className='w-full' type='submit'>
            {isLoading ? 'Loading...' : 'Add'}
          </Button>
        </div>
        <Button onClick={() => reset()} variant='secondary'>
          Reset
        </Button>
      </div>
    </form>
  );
};
