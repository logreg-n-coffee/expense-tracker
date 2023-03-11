// This page is only available in development mode

import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

export const getServerSideProps = () => {
  if (process.env.NODE_ENV === 'production') {
   return {
     redirect: {
       permanent: false,
       destination: "/",
     },
   };
 }
  return { props: {} };
};

const APITesting = () => {
  const { data } = useQuery(
    ['load-spreadsheets'],
    () => fetch('/api/google-sheets/spreadsheets')
    .then((response) => response.json())
    .catch(console.error),
    {
      refetchOnWindowFocus: false,
    }
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
        body: JSON.stringify(values),
      })
      .then((res) => res.json())
      .catch((err) => console.error(err)),
    {
      onSuccess: () => console.log('mutation completed successfully!!')
    }
  );

  const onSubmit = (data) => {
    console.log('onSubmit clicked!!');
    console.log('data sent from the browser: ', data);
    return mutate(data);
  };

  return (
    <>
      <div className='flex-row text-black outline m-4 p-4'>
        <h1 className='p-4 text-center'>All spreadsheets</h1>
        <p className='outline m-3'>{JSON.stringify(data, null, 4)}</p>
      </div>
      <div className='flex-row text-black outline m-4 p-4'>
        <p className='p-4 text-center'>Create an empty spreadsheet</p>
        <form 
          className='flex-row text-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input 
            {...register('title', { required: true })}
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
