import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

const APITesting = () => {
  const { data } = useQuery(
    ['load-spreadsheets'],
    () => fetch('/api/google-sheets/spreadsheets')
    .then((response) => response.json())
    .then(console.log)
    .catch(console.error)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { mutate } = useMutation(
    ['create-spreadsheet'],
    (values) => 
      fetch('/api/google-sheets/spreadsheets', {
        method: 'POST',
        data: JSON.stringify(values),
      })
      .then((res) => res.json())
      .catch((err) => console.error(err)),
  );

  const onSubmit = data => {
    console.log('onSubmit clicked!!');
    return mutate(data);
  };

  return (
    <>
      <div className='flex-row text-black outline m-4 p-4'>
        <h1 className='p-4 text-center'>All spreadsheets</h1>
        <p className='outline m-3'>{JSON.stringify(data)}</p>
      </div>
      <div className='flex-row text-black outline m-4 p-4'>
        <p className='p-4 text-center'>Create an empty spreadsheet</p>
        <form 
          className='flex-row text-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input 
            {...register('name', { required: true })}
            className='bg-white outline' 
            type='text' 
            placeholder='name this spreadsheet' 
          />
          <button className='outline m-3' type='submit'>
            Click me
          </button>
          <button className='outline m-3' onClick={() => reset()}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default APITesting;
