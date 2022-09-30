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
        <Field label='Amount' required>
          <input
            {...register('amount', { required: true })}
            className='text-black py-4'
            type='number'
            placeholder='$1.23'
          />
        </Field>

        <Field label='Date'>
          <input
            {...register('date', { required: true })}
            className='text-black py-4'
            type='date'
          />
        </Field>

        <Field label='Category'>
          <select {...register('category')} className='text-black py-4'>
            {data?.values?.map(([id, category]) => (
              <option key={id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Description'>
          <input
            {...register('description')}
            className='text-black py-4'
            type='text'
            placeholder='A cupcake'
          />
        </Field>
      </div>

      <div className='grid grid-cols-4 gap-2'>
        <div className='col-span-3'>
          <Button disabled={!isValid} className='py-4 w-full'>
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
