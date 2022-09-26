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

// 


export const ExpenseForm = () => {
  // retrieve the categories from the Google Sheets 
  const { data } = useCategories();

  // react hook form 
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({
    mode: 'onChange'
  });

  return (
    <form
      onSubmit={() => {}}
      className="flex flex-col gap-10 h-full"
    >
      <div className="flex flex-col gap-4">
        <Field label="Amount" required>
          <input
            className="text-black py-4"
            type="number"
            placeholder="$1.23"
          />
        </Field>

        <Field label="Date">
          <input
            className="text-black py-4"
            type="date"
          />
        </Field>

        <Field label="Category">
          <select {...register('category')} className="text-black py-4">
            {data?.values?.map(([id, category]) => (
              <option key={id} value={category}>{category}</option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <input
            className="text-black py-4"
            type="text"
            placeholder="A cupcake"
          />
        </Field>

      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <Button className="py-4 w-full">
            Add
          </Button>
        </div>
        <Button onClick={() =>{}} variant="secondary">
          Reset
        </Button>
      </div>
    </form>
  );
};
